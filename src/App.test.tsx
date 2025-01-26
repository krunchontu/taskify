import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Taskify App header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /Taskify App/i });
  expect(headerElement).toBeInTheDocument();
});

test('renders task list', () => {
  render(<App />);
  const taskList = screen.getByRole('list');
  expect(taskList).toBeInTheDocument();
  
  const tasks = screen.getAllByRole('listitem');
  expect(tasks.length).toBe(3);
  expect(tasks[0]).toHaveTextContent('Buy groceries');
});
