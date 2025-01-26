import React from 'react';
import { FiEdit, FiTrash, FiCheckCircle, FiCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { MdAccessTime, MdNotifications } from 'react-icons/md';
import {
  TaskItem as StyledTaskItem,
  TaskContent,
  DateLabel,
  NotesButton,
  NotesContent,
} from '../theme/components/TaskCard.styles';
import { PriorityBadge } from '../theme/components/PriorityBadge.styles';
import { CategoryBadge } from '../theme/components/CategoryBadge.styles';
import { RecurrenceBadge } from '../theme/components/RecurrenceBadge.styles';
import { TagContainer } from '../theme/components/TagContainer.styles';
import { Tag } from '../theme/components/Tag.styles';
import { Button } from '../theme/components/Button.styles';
import { Input } from '../theme/components/Input.styles';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  toggleCompleted: (id: string) => void;
  startEditing: (id: string) => void;
  saveEdit: (_id: string, _newText: string) => void;
  deleteTask: (id: string) => void;
  expandedNotes: Set<string>;
  toggleNotes: (id: string) => void;
  saveNotes: (id: string, newNotes: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleCompleted,
  startEditing,
  saveEdit,
  deleteTask,
  expandedNotes,
  toggleNotes,
  saveNotes,
}) => (
  <StyledTaskItem $completed={task.completed}>
    <TaskContent $completed={task.completed}>
      <div className="status-toggle" onClick={() => toggleCompleted(task.id)}>
        {task.completed ? (
          <FiCheckCircle size={24} className="completed-icon" />
        ) : (
          <FiCircle size={24} className="incomplete-icon" />
        )}
      </div>

      <div className="task-body">
      {task.isEditing ? (
        <div className="edit-container">
          <Input
            type="text"
            value={task.text}
            onChange={(e) => saveEdit(task.id, e.target.value)}
            autoFocus
          />
          <div className="edit-actions">
            <Button variant="success" onClick={() => saveEdit(task.id, task.text)}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => saveEdit(task.id, task.text)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="task-text">{task.text}</h3>
          <div className="task-meta">
      {task.dueDate && (
        <div className="date-info">
          <MdAccessTime className="icon" />
          <span>
            {new Date(task.dueDate).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      )}
      {task.reminder && (
        <div className="date-info">
          <MdNotifications className="icon" />
          <span>
            {new Date(task.reminder).toLocaleDateString()}
          </span>
        </div>
      )}
          </div>
          <div className="task-tags">
            <PriorityBadge $priority={task.priority}>
              {task.priority}
            </PriorityBadge>
            {task.category && <CategoryBadge>{task.category}</CategoryBadge>}
            {task.recurrence && (
              <RecurrenceBadge $recurrence={task.recurrence}>
                {task.recurrence}
              </RecurrenceBadge>
            )}
            {task.tags?.length > 0 && (
              <TagContainer>
                {task.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagContainer>
            )}
          </div>
        </>
      )}
      </div>

      <div className="task-actions">
        <Button
          variant="icon"
          onClick={(e) => {
            e.stopPropagation();
            startEditing(task.id);
          }}
        >
          <FiEdit size={18} />
        </Button>
        <Button variant="icon" onClick={() => deleteTask(task.id)}>
          <FiTrash size={18} />
        </Button>
        <NotesButton
          onClick={(e) => {
            e.stopPropagation();
            toggleNotes(task.id);
          }}
        >
          {expandedNotes.has(task.id) ? <FiChevronUp /> : <FiChevronDown />}
        </NotesButton>
      </div>
    </TaskContent>

    {expandedNotes.has(task.id) && (
      <NotesContent>
        <textarea
          value={task.notes || ''}
          onChange={(e) => saveNotes(task.id, e.target.value)}
          placeholder="Add notes..."
        />
      </NotesContent>
    )}
  </StyledTaskItem>
);

export default React.memo(TaskItem);
