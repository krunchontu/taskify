import React, { useMemo } from 'react';
import { TaskForm as StyledTaskForm } from '../theme/components/Form.styles';
import {
  InputGroup,
  DateTimeInput,
  Input,
} from '../theme/components/Input.styles';
import { Button } from '../theme/components/Button.styles';
import { Task } from '../types';
import { NotificationStatus } from '../hooks/useTasks';
import { baseTheme } from '../theme/theme';

interface TaskFormProps {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  dueDate: Date | null;
  setDueDate: React.Dispatch<React.SetStateAction<Date | null>>;
  reminderDate: Date | null;
  setReminderDate: React.Dispatch<React.SetStateAction<Date | null>>;
  categoryInput: string;
  setCategoryInput: React.Dispatch<React.SetStateAction<string>>;
  tagsInput: string;
  setTagsInput: React.Dispatch<React.SetStateAction<string>>;
  priorityInput: 'low' | 'medium' | 'high';
  setPriorityInput: React.Dispatch<
    React.SetStateAction<'low' | 'medium' | 'high'>
  >;
  recurrenceInput?: 'daily' | 'weekly' | 'monthly';
  setRecurrenceInput: React.Dispatch<
    React.SetStateAction<'daily' | 'weekly' | 'monthly' | undefined>
  >;
  notificationStatus: NotificationStatus;
  requestNotificationPermission: () => Promise<NotificationStatus>;
  addTask: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  newTask,
  setNewTask,
  dueDate,
  setDueDate,
  reminderDate,
  setReminderDate,
  categoryInput,
  setCategoryInput,
  tagsInput,
  setTagsInput,
  priorityInput,
  setPriorityInput,
  recurrenceInput,
  setRecurrenceInput,
  notificationStatus,
  requestNotificationPermission,
  addTask,
}) => {
  const toDate = useMemo(() => ({
    fromString: (value: string) => {
      if (!value) return null;

      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) return null;

      return parsed;
    },
  }), []);

  return (
  <StyledTaskForm
    onSubmit={(e: React.FormEvent) => {
      e.preventDefault();
      addTask();
    }}
  >
    <InputGroup>
      <Input
        type="text"
        value={newTask}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTask(e.target.value)
        }
        placeholder="Add a new task..."
        aria-label="New task"
      />
      <DateTimeInput>
        <Input
          type="datetime-local"
          value={dueDate?.toISOString().slice(0, 16) || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDueDate(toDate.fromString(e.target.value));
          }}
          aria-label="Due date"
        />
      </DateTimeInput>
      <DateTimeInput>
        <Input
          type="datetime-local"
          value={reminderDate?.toISOString().slice(0, 16) || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setReminderDate(toDate.fromString(e.target.value));
          }}
          aria-label="Reminder"
        />
      </DateTimeInput>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <small>
          {notificationStatus === 'unsupported' && 'Notifications are unavailable in this browser.'}
          {notificationStatus === 'denied' && 'Notifications are blocked; reminders will stay on the page.'}
          {notificationStatus === 'prompt' && 'Enable notifications to receive reminder alerts.'}
          {notificationStatus === 'granted' && 'Reminder alerts will appear as desktop notifications.'}
        </small>
        {(notificationStatus === 'prompt' || notificationStatus === 'denied') && (
          <Button
            type="button"
            variant="secondary"
            onClick={requestNotificationPermission}
            style={{ alignSelf: 'flex-start' }}
          >
            Enable reminders
          </Button>
        )}
      </div>
      <select
        value={categoryInput}
        onChange={(e) => setCategoryInput(e.target.value)}
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: `1px solid ${baseTheme.colors.border}`,
        }}
      >
        <option value="">Select Category</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      <select
        value={recurrenceInput || ''}
        onChange={(e) =>
          setRecurrenceInput(
            (e.target.value as Task['recurrence']) || undefined
          )
        }
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: `1px solid ${baseTheme.colors.border}`,
        }}
      >
        <option value="">No Recurrence</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
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
          border: `1px solid ${baseTheme.colors.border}`,
        }}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
    </InputGroup>
    <Button type="submit">Add Task</Button>
  </StyledTaskForm>
  );
};

export default TaskForm;
