import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App UI interactions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('allows notes to be added and persist after toggling', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/New task/i), 'Notes coverage');
    await user.click(screen.getByRole('button', { name: /Add Task/i }));

    const notesToggle = screen.getByRole('button', { name: /Show notes/i });
    await user.click(notesToggle);

    const notesField = screen.getByPlaceholderText(/Add notes/i);
    await user.type(notesField, 'Important details');
    expect(notesField).toHaveValue('Important details');

    await user.click(screen.getByRole('button', { name: /Hide notes/i }));
    await user.click(screen.getByRole('button', { name: /Show notes/i }));
    expect(screen.getByPlaceholderText(/Add notes/i)).toHaveValue('Important details');
  });

  test('filters tasks by selected category', async () => {
    const user = userEvent.setup();
    render(<App />);

    const taskInput = screen.getByLabelText(/New task/i);
    const categorySelect = screen.getByLabelText(/Task category/i);

    await user.type(taskInput, 'Work task');
    await user.selectOptions(categorySelect, 'Work');
    await user.click(screen.getByRole('button', { name: /Add Task/i }));

    await user.type(taskInput, 'Personal task');
    await user.selectOptions(categorySelect, 'Personal');
    await user.click(screen.getByRole('button', { name: /Add Task/i }));

    const filterSelect = screen.getByLabelText(/Filter by Category/i);
    await user.selectOptions(filterSelect, 'Work');

    expect(screen.getByText('Work task')).toBeInTheDocument();
    expect(screen.queryByText('Personal task')).not.toBeInTheDocument();

    await user.selectOptions(filterSelect, 'all');
    const list = screen.getByRole('region', { name: /Task list/i });
    expect(within(list).getByText('Work task')).toBeInTheDocument();
    expect(within(list).getByText('Personal task')).toBeInTheDocument();
  });
});
