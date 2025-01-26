import React from 'react';
import { TaskItem as StyledTaskItem, TaskContent, DateLabel, NotesButton, NotesContent } from '../theme/components/TaskCard.styles';
import { PriorityBadge, CategoryBadge, RecurrenceBadge, TagContainer, Tag } from '../theme/components';
import { Button } from '../theme/components/Button.styles';
import { Input } from '../theme/components/Input.styles';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  toggleCompleted: (id: number) => void;
  startEditing: (id: number) => void;
  saveEdit: (id: number, newText: string) => void;
  deleteTask: (id: number) => void;
  expandedNotes: Set<number>;
  toggleNotes: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleCompleted,
  startEditing,
  saveEdit,
  deleteTask,
  expandedNotes,
  toggleNotes
}) => (
  <StyledTaskItem $completed={task.completed}>
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
          {task.recurrence && (
            <RecurrenceBadge>
              {task.recurrence.charAt(0).toUpperCase() + task.recurrence.slice(1)}
            </RecurrenceBadge>
          )}
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

    <NotesButton 
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        toggleNotes(task.id);
      }}
      aria-label={`${expandedNotes.has(task.id) ? 'Collapse' : 'Expand'} notes`}
    >
      {expandedNotes.has(task.id) ? '▲ Notes' : '▼ Notes'}
    </NotesButton>

    {expandedNotes.has(task.id) && (
      <NotesContent>
        <textarea
          value={task.notes || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            saveEdit(task.id, task.text, e.target.value);
          }}
          placeholder="Add notes..."
          aria-label="Task notes"
        />
      </NotesContent>
    )}

    <Button 
      variant="danger" 
      onClick={() => deleteTask(task.id)}
      aria-label={`Delete task "${task.text}"`}
    >
      Delete
    </Button>
  </StyledTaskItem>
);

export default TaskItem;
