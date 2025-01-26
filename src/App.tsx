import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/GlobalStyles';
import { baseTheme, darkThemeOverrides } from './theme/theme';
import { Container, TaskList } from './theme/components/Layout.styles';
import { TaskForm } from './theme/components/Form.styles';
import { InputGroup, DateTimeInput, Input } from './theme/components/Input.styles';
import { Button } from './theme/components/Button.styles';
import { CategoryBadge } from './theme/components/CategoryBadge.styles';
import { TagContainer } from './theme/components/TagContainer.styles';
import { Tag } from './theme/components/Tag.styles';
import { TaskItem, TaskContent, DateLabel } from './theme/components/TaskCard.styles';
import { ThemeToggle } from './theme/components/ThemeToggle.styles';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date | null;
  reminder?: Date | null;
  isEditing?: boolean;
  category?: string;
  tags?: string[];
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
  const [categoryInput, setCategoryInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [priorityInput, setPriorityInput] = useState<Task['priority']>('medium');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const addTask = () => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        }
      });
    }

    if (newTask.trim() === '') return;
    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      dueDate: dueDate,
      reminder: reminderDate,
      priority: priorityInput,
      category: categoryInput || undefined,
      tags: tagsInput ? tagsInput.split(',').map(t => t.trim()) : undefined
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

  const startEditing = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isEditing: true } : { ...task, isEditing: false }
    ));
  };

  const saveEdit = (id: number, newText: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText, isEditing: false } : task
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
    <ThemeProvider theme={darkMode ? { ...baseTheme, ...darkThemeOverrides } : baseTheme}>
      <GlobalStyles theme={darkMode ? { ...baseTheme, ...darkThemeOverrides } : baseTheme} />
      <Container>
        <ThemeToggle onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </ThemeToggle>
        
        <header>
          <h1>Taskify</h1>
        </header>

        <main>
          <TaskForm onSubmit={(e: React.FormEvent) => { 
            e.preventDefault(); 
            addTask(); 
          }}>
            <InputGroup>
              <Input
                type="text"
                value={newTask}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                aria-label="New task"
              />
              <DateTimeInput>
                <Input
                  type="datetime-local"
                  value={dueDate?.toISOString().slice(0, 16) || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(new Date(e.target.value))}
                  aria-label="Due date"
                />
              </DateTimeInput>
              <DateTimeInput>
                <Input
                  type="datetime-local"
                  value={reminderDate?.toISOString().slice(0, 16) || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReminderDate(new Date(e.target.value))}
                  aria-label="Reminder"
                />
              </DateTimeInput>
              <select
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                style={{ 
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: `1px solid ${baseTheme.colors.border}`
                }}
              >
                <option value="">Select Category</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
              <Input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Tags (comma-separated)"
                aria-label="Task tags"
              />
              <select
                value={priorityInput}
                onChange={(e) => setPriorityInput(e.target.value as Task['priority'])}
                style={{ 
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: `1px solid ${baseTheme.colors.border}`
                }}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </InputGroup>
            <Button type="submit">Add Task</Button>
          </TaskForm>

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
                border: `1px solid ${baseTheme.colors.border}`
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
            <p>No tasks yet. Add your first task!</p>
          ) : (
            <TaskList>
              {tasks
                .filter(task => selectedCategory === 'all' || task.category === selectedCategory)
                .map(task => (
                <TaskItem key={task.id} $completed={task.completed}>
                  <TaskContent 
                    $completed={task.completed} 
                    onClick={() => toggleCompleted(task.id)}
                  >
                    {task.isEditing ? (
                      <Input
                        type="text"
                        value={task.text}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                          saveEdit(task.id, e.target.value)
                        }
                        onBlur={() => saveEdit(task.id, task.text)}
                        autoFocus
                      />
                    ) : (
                      <>
                        {task.text}
                        <PriorityBadge $priority={task.priority}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </PriorityBadge>
                        <Button 
                          variant="secondary" 
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(task.id);
                          }}
                          aria-label={`Edit task "${task.text}"`}
                        >
                          Edit
                        </Button>
                      </>
                    )}
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
                    {task.category && <CategoryBadge>{task.category}</CategoryBadge>}
                    {task.tags && task.tags.length > 0 && (
                      <TagContainer>
                        {task.tags.map((tag, index) => (
                          <Tag key={index}>#{tag}</Tag>
                        ))}
                      </TagContainer>
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
