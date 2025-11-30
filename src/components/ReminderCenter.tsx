import React from 'react';
import { MdNotificationsActive } from 'react-icons/md';
import { ReminderAlert } from '../hooks/useTasks';
import { Button } from '../theme/components/Button.styles';
import {
  ReminderActions,
  ReminderCard,
  ReminderContainer,
  ReminderTitle,
} from '../theme/components/Reminder.styles';

interface ReminderCenterProps {
  alerts: ReminderAlert[];
  onDismiss: (id: string) => void;
  onSnooze: (id: string, minutes?: number) => void;
}

const ReminderCenter: React.FC<ReminderCenterProps> = ({ alerts, onDismiss, onSnooze }) => {
  if (alerts.length === 0) return null;

  const formatDateTime = (value: Date) =>
    value.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <ReminderContainer role="region" aria-label="Active reminders">
      <ReminderTitle>
        <MdNotificationsActive aria-hidden />
        <span>Reminders ready for action</span>
      </ReminderTitle>
      {alerts.map((alert) => (
        <ReminderCard key={alert.id}>
          <div>
            <strong>{alert.text}</strong>
            <p className="timestamp">Alerted at {formatDateTime(alert.reminderTime)}</p>
          </div>
          <ReminderActions>
            <Button variant="secondary" onClick={() => onSnooze(alert.id, 5)}>
              Snooze 5m
            </Button>
            <Button variant="secondary" onClick={() => onSnooze(alert.id, 15)}>
              Snooze 15m
            </Button>
            <Button variant="danger" onClick={() => onDismiss(alert.id)}>
              Dismiss
            </Button>
          </ReminderActions>
        </ReminderCard>
      ))}
    </ReminderContainer>
  );
};

export default ReminderCenter;
