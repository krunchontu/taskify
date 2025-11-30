import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types';

// Storage constants
const STORAGE_KEY = 'tasks_v1';
const MAX_STORAGE_SIZE = 1_048_576; // 1MB
export type NotificationStatus = 'unsupported' | 'prompt' | 'granted' | 'denied';

export type ReminderAlert = {
  id: string;
  text: string;
  reminderTime: Date;
};

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
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [dueDateInput, setDueDateInput] = useState('');
  const [reminderDateInput, setReminderDateInput] = useState('');
  const [dueDateError, setDueDateError] = useState<string | null>(null);
  const [reminderError, setReminderError] = useState<string | null>(null);
  const [categoryInput, setCategoryInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [priorityInput, setPriorityInput] = useState<Task['priority']>('medium');
  const [recurrenceInput, setRecurrenceInput] = useState<Task['recurrence']>();
  const [notificationStatus, setNotificationStatus] = useState<NotificationStatus>('prompt');
  const [activeReminders, setActiveReminders] = useState<ReminderAlert[]>([]);

  const parseDate = useCallback((value: string) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;

    return parsed;
  }, []);

  const handleDueDateChange = useCallback(
    (value: string) => {
      setDueDateInput(value);

      if (!value) {
        setDueDate(null);
        setDueDateError(null);
        setReminderError(null);
        return;
      }

      const parsed = parseDate(value);
      if (!parsed) {
        setDueDate(null);
        setDueDateError('Enter a valid due date and time.');
        return;
      }

      setDueDate(parsed);
      setDueDateError(null);

      if (reminderDate && reminderDate > parsed) {
        setReminderError('Reminder must be on or before the due date.');
      } else if (reminderError && reminderDate && reminderDate <= parsed) {
        setReminderError(null);
      }
    },
    [parseDate, reminderDate, reminderError]
  );

  const handleReminderChange = useCallback(
    (value: string) => {
      setReminderDateInput(value);

      if (!value) {
        setReminderDate(null);
        setReminderError(null);
        return;
      }

      const parsed = parseDate(value);
      if (!parsed) {
        setReminderDate(null);
        setReminderError('Enter a valid reminder date and time.');
        return;
      }

      if (dueDate && parsed > dueDate) {
        setReminderDate(parsed);
        setReminderError('Reminder must be on or before the due date.');
        return;
      }

      setReminderDate(parsed);
      setReminderError(null);
    },
    [dueDate, parseDate]
  );

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
    if (dueDateError || reminderError) return;

    if (reminderDate && dueDate && reminderDate > dueDate) {
      setReminderError('Reminder must be on or before the due date.');
      return;
    }

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
    setDueDateInput('');
    setReminderDateInput('');
    setDueDateError(null);
    setReminderError(null);
    setRecurrenceInput(undefined);
  }, [
    newTask,
    dueDate,
    reminderDate,
    priorityInput,
    categoryInput,
    tagsInput,
    recurrenceInput,
    requestNotificationPermission,
    dueDateError,
    reminderError,
  ]);

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

  const enqueueReminderAlert = useCallback((task: Task) => {
    if (!task.reminder) return;

    setActiveReminders((prev) => {
      if (prev.some((alert) => alert.id === task.id)) return prev;

      return [
        ...prev,
        {
          id: task.id,
          text: task.text,
          reminderTime: new Date(task.reminder),
        },
      ];
    });
  }, []);

  const dismissReminder = useCallback((id: string) => {
    setActiveReminders((prev) => prev.filter((alert) => alert.id !== id));
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
            ...task,
            reminder: undefined,
          }
          : task
      )
    );
  }, []);

  const snoozeReminder = useCallback((id: string, minutes = 5) => {
    const snoozeUntil = new Date(Date.now() + minutes * 60 * 1000);

    setActiveReminders((prev) => prev.filter((alert) => alert.id !== id));
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
            ...task,
            reminder: snoozeUntil,
          }
          : task
      )
    );
  }, []);

  useEffect(() => {
    const reminders = tasks.filter((task) => task.reminder);
    if (reminders.length === 0) return;

    const visibilityPollIntervalMs = 30000;
    const minimumPollIntervalMs = 1000;
    let timeoutId: number | undefined;

    const scheduleNext = (delayMs: number) => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(runCheck, delayMs);
    };

    const runCheck = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        scheduleNext(visibilityPollIntervalMs);
        return;
      }

      const now = Date.now();
      let hasChanges = false;
      let nextReminderTime: number | null = null;

      const updatedTasks = tasks.map((task) => {
        if (!task.reminder) return task;

        const reminderTime = new Date(task.reminder).getTime();
        if (Number.isNaN(reminderTime)) {
          hasChanges = true;
          return { ...task, reminder: undefined };
        }

        if (now >= reminderTime) {
          if (notificationStatus === 'granted') {
            try {
              new Notification(`Reminder: ${task.text}`, { body: 'Task due soon!' });
            } catch (error) {
              console.error('Failed to deliver reminder notification', error);
            }
          }

          enqueueReminderAlert(task);
          hasChanges = true;
          return { ...task, reminder: undefined };
        }

        nextReminderTime = nextReminderTime === null ? reminderTime : Math.min(nextReminderTime, reminderTime);
        return task;
      });

      if (hasChanges) {
        setTasks(updatedTasks);
        return;
      }

      if (nextReminderTime !== null) {
        scheduleNext(Math.max(nextReminderTime - now, minimumPollIntervalMs));
      }
    };

    const initialReminderTime = reminders
      .map((task) => (task.reminder ? new Date(task.reminder).getTime() : null))
      .filter((time): time is number => time !== null && !Number.isNaN(time))
      .reduce<number | null>((soonest, time) => (soonest === null ? time : Math.min(soonest, time)), null);

    if (initialReminderTime !== null) {
      scheduleNext(Math.max(initialReminderTime - Date.now(), minimumPollIntervalMs));
    }

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [enqueueReminderAlert, notificationStatus, tasks, setTasks]);

  useEffect(() => {
    setActiveReminders((prev) => prev.filter((alert) => tasks.some((task) => task.id === alert.id)));
  }, [tasks]);

  return {
    tasks,
    newTask,
    dueDate,
    dueDateInput,
    reminderDate,
    reminderDateInput,
    categoryInput,
    tagsInput,
    priorityInput,
    recurrenceInput,
    expandedNotes,
    dueDateError,
    reminderError,
    setNewTask,
    setDueDate,
    setReminderDate,
    setCategoryInput,
    setTagsInput,
    setPriorityInput,
    setRecurrenceInput,
    notificationStatus,
    requestNotificationPermission,
    onDueDateChange: handleDueDateChange,
    onReminderDateChange: handleReminderChange,
    addTask,
    deleteTask,
    toggleCompleted,
    startEditing,
    cancelEditing,
    saveEdit,
    toggleNotes,
    saveNotes,
    dismissReminder,
    snoozeReminder,
    activeReminders
  };
};
