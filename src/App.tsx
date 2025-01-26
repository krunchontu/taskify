import React, { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ErrorInfo } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/GlobalStyles';
import { baseTheme, darkThemeOverrides } from './theme/theme';
import { Container } from './theme/components/Layout.styles';
import TaskList from './components/TaskList';
import { Task } from './types';
import TaskForm from './components/TaskForm';
import { ThemeToggle } from './theme/components/ThemeToggle.styles';


function App() {
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());
  const tasksRef = useRef<Task[]>([]);

  const toggleNotes = useCallback((taskId: string) => {
    setExpandedNotes((prev) => {
      const next = new Set(prev);
      next.has(taskId) ? next.delete(taskId) : next.add(taskId);
      return next;
    });
  }, []);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [categoryInput, setCategoryInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [priorityInput, setPriorityInput] =
    useState<Task['priority']>('medium');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recurrenceInput, setRecurrenceInput] = useState<Task['recurrence']>();

  const addTask = useCallback(() => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        }
      });
    }

    if (newTask.trim() === '') return;
    const task: Task = {
      id: uuidv4(),
      text: newTask,
      completed: false,
      dueDate: dueDate,
      reminder: reminderDate,
      priority: priorityInput,
      category: categoryInput || undefined,
      tags: tagsInput ? tagsInput.split(',').map((t) => t.trim()) : undefined,
      recurrence: recurrenceInput,
    };
    setRecurrenceInput(undefined);
    setTasks([...tasks, task]);
    setNewTask('');
    setDueDate(null);
    setReminderDate(null);
  }, [
    newTask, 
    dueDate, 
    reminderDate, 
    priorityInput, 
    categoryInput, 
    tagsInput, 
    recurrenceInput, 
    tasks
  ]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const toggleCompleted = useCallback((id: string) => {
    setTasks((tasks) =>
      tasks.flatMap((task) => {
        if (task.id === id) {
          const newCompleted = !task.completed;
          const updatedTask = { ...task, completed: newCompleted };

          if (newCompleted && updatedTask.recurrence) {
            const newTask = createRecurringTask(updatedTask);
            return [updatedTask, newTask];
          }
          return updatedTask;
        }
        return task;
      })
    );
  }, [createRecurringTask]);

  const createRecurringTask = useCallback((task: Task): Task => {
    const baseDate = task.dueDate || new Date();
    const nextDueDate = new Date(baseDate);

    switch (task.recurrence) {
      case 'daily':
        nextDueDate.setDate(nextDueDate.getDate() + 1);
        break;
      case 'weekly':
        nextDueDate.setDate(nextDueDate.getDate() + 7);
        break;
      case 'monthly':
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
        break;
    }

    return {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      dueDate: nextDueDate,
      reminder: task.reminder
        ? new Date(
            nextDueDate.getTime() -
              (task.dueDate?.getTime()
                ? task.dueDate.getTime() - task.reminder.getTime()
                : 0)
          )
        : undefined,
    };
  }, []);

  const startEditing = useCallback((id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, isEditing: true }
          : { ...task, isEditing: false }
      )
    );
  }, []);

  const saveEdit = useCallback((id: string, newText: string, newNotes?: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: newText,
              notes: newNotes !== undefined ? newNotes : task.notes,
              isEditing: false,
            }
          : task
      )
    );
  }, []);


  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]); // Already correct, but confirming it's present

  useEffect(() => {
    const checkReminders = (currentTasks: Task[]) => {
      currentTasks.forEach((task) => {
        if (task.reminder && new Date() > task.reminder) {
          new Notification(`Reminder: ${task.text}`, {
            body: `Task due soon!`,
          });
        }
      });
    };

    const interval = setInterval(() => {
      checkReminders(tasksRef.current);
    }, 60000);
    return () => clearInterval(interval);
  }, [tasksRef]);

  const saveNotes = useCallback((id: string, newNotes: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, notes: newNotes } : task
      )
    );
  }, []);

  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider
      theme={darkMode ? { ...baseTheme, ...darkThemeOverrides } : baseTheme}
    >
      <GlobalStyles
        theme={darkMode ? { ...baseTheme, ...darkThemeOverrides } : baseTheme}
      />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error: Error, info: ErrorInfo) => {
          console.error('Taskify Error:', error, info);
        }}
      >
        <Container>
          <ThemeToggle onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </ThemeToggle>

          <header>
            <h1>Taskify</h1>
          </header>

          <main>
            <TaskForm
              newTask={newTask}
              setNewTask={setNewTask}
              dueDate={dueDate}
              setDueDate={setDueDate}
              reminderDate={reminderDate}
              setReminderDate={setReminderDate}
              categoryInput={categoryInput}
              setCategoryInput={setCategoryInput}
              tagsInput={tagsInput}
              setTagsInput={setTagsInput}
              priorityInput={priorityInput}
              setPriorityInput={setPriorityInput}
              recurrenceInput={recurrenceInput}
              setRecurrenceInput={setRecurrenceInput}
              addTask={addTask}
            />

            <div style={{ margin: '1rem 0' }}>
              <label htmlFor="category-filter">Filter by Category: </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '0.5rem',
                  marginLeft: '0.5rem',
                  borderRadius: '4px',
                  border: `1px solid ${baseTheme.colors.border}`,
                }}
              >
                <option value="all">All Tasks</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {tasks.length === 0 ? (
              <p role="status" aria-live="polite" aria-atomic="true">
                No tasks yet. Add your first task!
              </p>
            ) : (
              <div role="region" aria-label="Task list">
                <TaskList
                  tasks={tasks}
                  selectedCategory={selectedCategory}
                  toggleCompleted={toggleCompleted}
                  startEditing={startEditing}
                  saveEdit={saveEdit}
                  deleteTask={deleteTask}
                  expandedNotes={expandedNotes}
                  toggleNotes={toggleNotes}
                  saveNotes={saveNotes}
                />
              </div>
            )}
          </main>
        </Container>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default App;
