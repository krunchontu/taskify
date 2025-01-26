import { useState, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const tasksRef = useRef<Task[]>([]);
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [categoryInput, setCategoryInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [priorityInput, setPriorityInput] = useState<Task['priority']>('medium');
  const [recurrenceInput, setRecurrenceInput] = useState<Task['recurrence']>();

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const addTask = useCallback(() => {
    if (newTask.trim() === '') return;
    
    const task: Task = {
      id: uuidv4(),
      text: newTask,
      completed: false,
      dueDate,
      reminder: reminderDate,
      priority: priorityInput,
      category: categoryInput || undefined,
      tags: tagsInput ? tagsInput.split(',').map(t => t.trim()) : undefined,
      recurrence: recurrenceInput,
    };

    setTasks(prev => [...prev, task]);
    setNewTask('');
    setDueDate(null);
    setReminderDate(null);
    setRecurrenceInput(undefined);
  }, [newTask, dueDate, reminderDate, priorityInput, categoryInput, tagsInput, recurrenceInput]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const createRecurringTask = useCallback((task: Task): Task => {
    const baseDate = task.dueDate || new Date();
    const nextDueDate = new Date(baseDate);

    switch (task.recurrence) {
      case 'daily': nextDueDate.setDate(nextDueDate.getDate() + 1); break;
      case 'weekly': nextDueDate.setDate(nextDueDate.getDate() + 7); break;
      case 'monthly': nextDueDate.setMonth(nextDueDate.getMonth() + 1); break;
    }

    return {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      dueDate: nextDueDate,
      reminder: task.reminder ? new Date(
        nextDueDate.getTime() - (task.dueDate?.getTime() ? 
        task.dueDate.getTime() - task.reminder.getTime() : 0)
      ) : undefined,
    };
  }, []);

  const toggleCompleted = useCallback((id: string) => {
    setTasks(prev => prev.flatMap(task => {
      if (task.id !== id) return task;
      const updated = {...task, completed: !task.completed};
      
      if (!updated.completed || !updated.recurrence) return updated;
      return [updated, createRecurringTask(updated)];
    }));
  }, [createRecurringTask]);

  const startEditing = useCallback((id: string) => {
    setTasks(prev => prev.map(task => ({
      ...task,
      isEditing: task.id === id
    })));
  }, []);

  const saveEdit = useCallback((id: string, text: string, notes?: string) => {
    setTasks(prev => prev.map(task => task.id === id ? {
      ...task,
      text,
      notes: notes ?? task.notes,
      isEditing: false
    } : task));
  }, []);

  const toggleNotes = useCallback((id: string) => {
    setExpandedNotes(prev => new Set(prev).delete(id) || prev.add(id) ? new Set(prev) : prev);
  }, []);

  const saveNotes = useCallback((id: string, notes: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? {...task, notes} : task
    ));
  }, []);

  useEffect(() => {
    const checkReminders = (currentTasks: Task[]) => {
      currentTasks.forEach(task => {
        if (task.reminder && new Date() > task.reminder) {
          new Notification(`Reminder: ${task.text}`, {body: 'Task due soon!'});
        }
      });
    };

    const interval = setInterval(() => checkReminders(tasksRef.current), 60000);
    return () => clearInterval(interval);
  }, []);

  return {
    tasks,
    newTask,
    dueDate,
    reminderDate,
    categoryInput,
    tagsInput,
    priorityInput,
    recurrenceInput,
    expandedNotes,
    setNewTask,
    setDueDate,
    setReminderDate,
    setCategoryInput,
    setTagsInput,
    setPriorityInput,
    setRecurrenceInput,
    addTask,
    deleteTask,
    toggleCompleted,
    startEditing,
    saveEdit,
    toggleNotes,
    saveNotes
  };
};
