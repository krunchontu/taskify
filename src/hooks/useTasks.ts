import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types';

// Storage constants
const STORAGE_KEY = 'tasks_v1';
const MAX_STORAGE_SIZE = 1_048_576; // 1MB
export type NotificationStatus = 'unsupported' | 'prompt' | 'granted' | 'denied';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      // Clean up legacy storage format first
      localStorage.removeItem('tasks');
      
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // Basic size validation
        if (saved.length > MAX_STORAGE_SIZE) {
          throw new Error('Storage contents too large');
        }

        const parsed = JSON.parse(saved);

        return parsed.map((task: Task) => {
          const hydratedDueDate = task.dueDate ? new Date(task.dueDate) : null;
          const hydratedReminder = task.reminder ? new Date(task.reminder) : null;

          const dueDate = hydratedDueDate && !Number.isNaN(hydratedDueDate.getTime())
            ? hydratedDueDate
            : null;

          const reminder = hydratedReminder && !Number.isNaN(hydratedReminder.getTime())
            ? hydratedReminder
            : undefined;

          return {
            ...task,
            dueDate,
            reminder,
            // Add date conversions for any future date fields here
          };
        });
      }
    } catch (error) {
      console.error('Failed to load tasks from storage:', error);
      // Clear corrupted storage
      localStorage.removeItem(STORAGE_KEY);
    }
    return [];
  });
  const tasksRef = useRef<Task[]>([]);
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [categoryInput, setCategoryInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [priorityInput, setPriorityInput] = useState<Task['priority']>('medium');
  const [recurrenceInput, setRecurrenceInput] = useState<Task['recurrence']>();
  const [notificationStatus, setNotificationStatus] = useState<NotificationStatus>('prompt');

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  // Add persistence effect
  useEffect(() => {
    try {
      if (tasks.length > 0) {
        const serialized = JSON.stringify(tasks);

        // Validate payload size
        if (serialized.length > MAX_STORAGE_SIZE) {
          throw new Error(`Task storage limit exceeded (max ${MAX_STORAGE_SIZE / 1_048_576}MB)`);
        }

        localStorage.setItem(STORAGE_KEY, serialized);
      } else {
        // Clear storage when no tasks
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Failed to persist tasks:', error);
    }
  }, [tasks]);

  useEffect(() => {
    const notificationApi = typeof Notification !== 'undefined' ? Notification : undefined;
    if (!notificationApi) {
      setNotificationStatus('unsupported');
      return;
    }

    if (notificationApi.permission === 'granted') {
      setNotificationStatus('granted');
    } else if (notificationApi.permission === 'denied') {
      setNotificationStatus('denied');
    } else {
      setNotificationStatus('prompt');
    }
  }, []);

  const requestNotificationPermission = useCallback(async (): Promise<NotificationStatus> => {
    const notificationApi = typeof Notification !== 'undefined' ? Notification : undefined;
    if (!notificationApi) {
      setNotificationStatus('unsupported');
      return 'unsupported';
    }

    if (notificationApi.permission === 'granted') {
      setNotificationStatus('granted');
      return 'granted';
    }

    try {
      const permission = await notificationApi.requestPermission();
      const mapped = permission === 'granted' ? 'granted' : 'denied';
      setNotificationStatus(mapped);
      return mapped;
    } catch (error) {
      console.error('Failed to request notification permission', error);
      setNotificationStatus('denied');
      return 'denied';
    }
  }, []);

  const addTask = useCallback(() => {
    if (newTask.trim() === '') return;

    if (reminderDate) {
      void requestNotificationPermission();
    }

    const task: Task = {
      id: uuidv4(),
      text: newTask,
      completed: false,
      dueDate,
      reminder: reminderDate,
      priority: priorityInput,
      category: categoryInput || undefined,
      tags: tagsInput ? tagsInput.split(',').map((t) => t.trim()) : undefined,
      recurrence: recurrenceInput,
    };

    setTasks((prev) => [...prev, task]);
    setNewTask('');
    setDueDate(null);
    setReminderDate(null);
    setRecurrenceInput(undefined);
  }, [newTask, dueDate, reminderDate, priorityInput, categoryInput, tagsInput, recurrenceInput, requestNotificationPermission]);

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

    const reminderOffset = task.reminder && task.dueDate
      ? task.dueDate.getTime() - task.reminder.getTime()
      : null;

    return {
      ...task,
      id: uuidv4(),
      completed: false,
      dueDate: nextDueDate,
      reminder: reminderOffset !== null ? new Date(nextDueDate.getTime() - reminderOffset) : undefined,
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

  const cancelEditing = useCallback((id: string) => {
    setTasks(prev => prev.map(task => task.id === id ? {
      ...task,
      isEditing: false
    } : task));
  }, []);

  const saveEdit = useCallback((id: string, text: string, notes?: string) => {
    const trimmedText = text.trim();

    setTasks(prev => prev.map(task => task.id === id ? {
      ...task,
      text: trimmedText || task.text,
      notes: notes ?? task.notes,
      isEditing: false
    } : task));
  }, []);

  const toggleNotes = useCallback((id: string) => {
    setExpandedNotes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const saveNotes = useCallback((id: string, notes: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? {...task, notes} : task
    ));
  }, []);

  useEffect(() => {
    if (notificationStatus !== 'granted') return;
    if (!tasks.some((task) => task.reminder)) return;

    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        return;
      }

      setTasks((prev) => prev.map((task) => {
        if (!task.reminder) return task;

        const reminderTime = new Date(task.reminder).getTime();
        if (Number.isNaN(reminderTime)) return { ...task, reminder: undefined };

        if (Date.now() >= reminderTime) {
          try {
            new Notification(`Reminder: ${task.text}`, { body: 'Task due soon!' });
          } catch (error) {
            console.error('Failed to deliver reminder notification', error);
          }
          return { ...task, reminder: undefined };
        }

        return task;
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, [notificationStatus, tasks, setTasks]);

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
    notificationStatus,
    requestNotificationPermission,
    addTask,
    deleteTask,
    toggleCompleted,
    startEditing,
    cancelEditing,
    saveEdit,
    toggleNotes,
    saveNotes
  };
};
