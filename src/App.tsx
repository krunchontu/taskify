import React, { useState, useMemo, useCallback } from 'react';
import { ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/GlobalStyles';
import { baseTheme, darkThemeOverrides } from './theme/theme';
import { Container } from './theme/components/Layout.styles';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { ThemeToggle } from './theme/components/ThemeToggle.styles';
import { useTasks } from './hooks/useTasks';
import { ErrorFallback } from './components/ErrorFallback';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const {
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
  } = useTasks();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const currentTheme = useMemo(() => 
    darkMode ? {...baseTheme, ...darkThemeOverrides} : baseTheme, 
    [darkMode]
  );

  const handleError = useCallback((error: Error, info: ErrorInfo) => {
    console.error('Taskify Error:', error, info);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles theme={currentTheme} />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={handleError}
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


export default App;
