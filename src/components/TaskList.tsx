import React from 'react';
import { StyledTaskList } from '../theme/components/Layout.styles';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  selectedCategory: string;
  toggleCompleted: (id: number) => void;
  startEditing: (id: number) => void;
  saveEdit: (id: number, newText: string) => void;
  deleteTask: (id: number) => void;
  expandedNotes: Set<number>;
  toggleNotes: (id: number) => void;
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
        />
      ))}
  </StyledTaskList>
);

export default TaskList;
