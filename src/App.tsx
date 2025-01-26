import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { 
  GlobalStyle, theme, Container, TaskForm, InputGroup, DateTimeInput, 
  Input, Button, TaskList, TaskItem, TaskContent, DateLabel, ThemeToggle 
} from './styles';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: Date | null;
  reminder?: Date | null;
}

type DraggableTask = Task & {
  index: number;
}

function App() {
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);

  const addTask = () => {
    if (newTask.trim() === '') return;
    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      dueDate: dueDate,
      reminder: reminderDate
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setDueDate(null);
    setReminderDate(null);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompleted = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTasks(items);
  };

  useEffect(() => {
    const checkReminders = () => {
      tasks.forEach(task => {
        if (task.reminder && new Date() > task.reminder) {
          new Notification(`Reminder: ${task.text}`, {
            body: `Task due soon!`
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? theme.dark : theme.light}>
      <GlobalStyle />
      <Container>
        <ThemeToggle onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </ThemeToggle>
        
        <header>
          <h1>Taskify</h1>
        </header>

        <main>
          <TaskForm onSubmit={e => { e.preventDefault(); addTask(); }}>
            <InputGroup>
              <Input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                aria-label="New task"
              />
              <DateTimeInput>
                <Input
                  type="datetime-local"
                  value={dueDate?.toISOString().slice(0, 16) || ''}
                  onChange={(e) => setDueDate(new Date(e.target.value))}
                  aria-label="Due date"
                />
              </DateTimeInput>
              <DateTimeInput>
                <Input
                  type="datetime-local"
                  value={reminderDate?.toISOString().slice(0, 16) || ''}
                  onChange={(e) => setReminderDate(new Date(e.target.value))}
                  aria-label="Reminder"
                />
              </DateTimeInput>
            </InputGroup>
            <Button type="submit">Add Task</Button>
          </TaskForm>

          {tasks.length === 0 ? (
            <p>No tasks yet. Add your first task!</p>
          ) : (
            <TaskList>
              {tasks.map(task => (
                <TaskItem key={task.id} completed={task.completed}>
                  <TaskContent 
                    completed={task.completed} 
                    onClick={() => toggleCompleted(task.id)}
                  >
                    {task.text}
                    {task.dueDate && (
                      <DateLabel>
                        Due: {new Date(task.dueDate).toLocaleString()}
                      </DateLabel>
                    )}
                    {task.reminder && (
                      <DateLabel>
                        Reminder: {new Date(task.reminder).toLocaleString()}
                      </DateLabel>
                    )}
                  </TaskContent>
                  <Button 
                    variant="danger" 
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete task "${task.text}"`}
                  >
                    Delete
                  </Button>
                </TaskItem>
              ))}
            </TaskList>
          )}
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
