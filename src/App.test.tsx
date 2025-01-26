import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Taskify App header', () => {
  render(<App />);
  const header = screen.getByRole('heading', { 
    name: /Taskify App/i,
    level: 1
  });
  expect(header).toBeInTheDocument();
});

test('renders task list', () => {
  render(<App />);
  const taskList = screen.getByRole('list');
  expect(taskList).toBeInTheDocument();
  
  const tasks = screen.getAllByTestId('task-item');
  expect(tasks.length).toBeGreaterThan(0);
});
