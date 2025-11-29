import { act, renderHook, waitFor } from '@testing-library/react';
import { useTasks } from './useTasks';

const oneHour = 60 * 60 * 1000;

describe('useTasks', () => {
  const originalNotification = global.Notification;

  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    global.Notification = originalNotification;
    jest.useRealTimers();
  });

  test('strips invalid persisted dates', () => {
    const storedTask = {
      id: '1',
      text: 'Broken dates',
      completed: false,
      priority: 'medium' as const,
      dueDate: 'not-a-date',
      reminder: 'not-a-date-either',
    };

    localStorage.setItem('tasks_v1', JSON.stringify([storedTask]));

    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].dueDate).toBeNull();
    expect(result.current.tasks[0].reminder).toBeUndefined();
  });

  test('completing a recurring task schedules the next instance with the same reminder offset', () => {
    const dueDate = new Date('2025-01-01T12:00:00Z');
    const reminder = new Date(dueDate.getTime() - oneHour);

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setNewTask('Recurring task');
      result.current.setDueDate(dueDate);
      result.current.setReminderDate(reminder);
      result.current.setRecurrenceInput('weekly');
    });

    act(() => {
      result.current.addTask();
    });

    const initialTask = result.current.tasks[0];
    expect(initialTask.recurrence).toBe('weekly');

    act(() => {
      result.current.toggleCompleted(initialTask.id);
    });

    const newTasks = result.current.tasks.filter((task) => !task.completed);
    expect(newTasks).toHaveLength(1);

    const nextTask = newTasks[0];
    expect(nextTask.dueDate?.getTime()).toBe(dueDate.getTime() + 7 * 24 * oneHour);
    expect(nextTask.reminder?.getTime()).toBe(nextTask.dueDate!.getTime() - oneHour);
  });

  test('fires reminders once when permission is granted', async () => {
    const messages: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const NotificationMock: any = Object.assign(
      function NotificationMock(title: string) {
        messages.push(title);
      },
      {
        permission: 'granted' as NotificationPermission,
        requestPermission: jest.fn().mockResolvedValue('granted'),
      }
    );

    global.Notification = NotificationMock;

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setNewTask('Reminder task');
      result.current.setReminderDate(new Date(Date.now() - 1000));
    });

    act(() => {
      result.current.addTask();
    });

    act(() => {
      jest.advanceTimersByTime(31000);
    });

    await waitFor(() => expect(messages).toHaveLength(1));
    await waitFor(() => expect(result.current.tasks[0].reminder).toBeUndefined());
  });
});
