import React from 'react';
import { StyledTaskList } from '../theme/components/Layout.styles';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  selectedCategory: string;
  toggleCompleted: (id: string) => void;
  startEditing: (id: string) => void;
  saveEdit: (id: string, newText: string) => void;
  deleteTask: (id: string) => void;
  expandedNotes: Set<string>;
  toggleNotes: (id: string) => void;
  saveNotes: (id: string, newNotes: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedCategory,
  toggleCompleted,
  startEditing,
  saveEdit,
  deleteTask,
  expandedNotes,
  toggleNotes,
}) => (
  <StyledTaskList>
    {tasks
      .filter(
        (task) =>
          selectedCategory === 'all' || task.category === selectedCategory
      )
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleCompleted={toggleCompleted}
          startEditing={startEditing}
          saveEdit={saveEdit}
          deleteTask={deleteTask}
          expandedNotes={expandedNotes}
          toggleNotes={toggleNotes}
          saveNotes={saveNotes}
        />
      ))}
  </StyledTaskList>
);

export default TaskList;
