import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Taskify header', () => {
  render(<App />);
  const header = screen.getByRole('heading', { name: /Taskify/i, level: 1 });
  expect(header).toBeInTheDocument();
});

test('shows empty state when no tasks exist', () => {
  render(<App />);
  expect(screen.getByText(/No tasks yet. Add your first task!/i)).toBeInTheDocument();
});
