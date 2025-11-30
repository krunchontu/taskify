import React from 'react';
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
  dueDateInput: string;
  reminderDateInput: string;
  onDueDateChange: (value: string) => void;
  onReminderDateChange: (value: string) => void;
  dueDateError?: string | null;
  reminderError?: string | null;
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
  dueDateInput,
  reminderDateInput,
  onDueDateChange,
  onReminderDateChange,
  dueDateError,
  reminderError,
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
          value={dueDateInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onDueDateChange(e.target.value);
          }}
          aria-label="Due date"
          aria-invalid={Boolean(dueDateError)}
          aria-describedby={dueDateError ? 'due-date-error' : undefined}
        />
      </DateTimeInput>
      <DateTimeInput>
        <Input
          type="datetime-local"
          value={reminderDateInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onReminderDateChange(e.target.value);
          }}
          aria-label="Reminder"
          aria-invalid={Boolean(reminderError)}
          aria-describedby={reminderError ? 'reminder-error' : undefined}
        />
      </DateTimeInput>
      {dueDateError && (
        <small id="due-date-error" role="status" style={{ color: baseTheme.colors.danger }}>
          {dueDateError}
        </small>
      )}
      {reminderError && (
        <small id="reminder-error" role="status" style={{ color: baseTheme.colors.danger }}>
          {reminderError}
        </small>
      )}
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
        aria-label="Task category"
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
