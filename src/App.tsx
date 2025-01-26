import React, { useState } from 'react';
import './App.css';

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

  return (
    <div className="app">
      <header className="app-header">
        <h1>Taskify App</h1>
      </header>
      <main>
        <div className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <input
            type="datetime-local"
            value={dueDate?.toISOString().slice(0, 16) || ''}
            onChange={(e) => setDueDate(new Date(e.target.value))}
          />
          <input
            type="datetime-local"
            value={reminderDate?.toISOString().slice(0, 16) || ''}
            onChange={(e) => setReminderDate(new Date(e.target.value))}
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Add your first task!</p>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <span onClick={() => toggleCompleted(task.id)}>
                  {task.text}
                </span>
                <button 
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
