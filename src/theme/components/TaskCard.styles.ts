import styled, { css } from 'styled-components';

export const TaskItem = styled.li<{ $completed: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.2s ease;
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  ${({ $completed }) => $completed && `
    opacity: 0.7;
    background: ${({ theme }) => theme.colors.hover};
  `}
`;

export const TaskContent = styled.div<{ $completed: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  align-items: start;

  .status-toggle {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.2s;
    padding-top: ${({ theme }) => theme.spacing(0.5)};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .task-body {
    flex: 1;
    
    .task-text {
      margin: 0;
      font-size: 1.1rem;
      color: ${({ theme }) => theme.colors.text};
      ${({ $completed }) => $completed && 'opacity: 0.6;'}
    }

    .task-meta {
      display: flex;
      gap: ${({ theme }) => theme.spacing(3)};
      margin: ${({ theme }) => theme.spacing(1)} 0;
      
      .date-info {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(0.5)};
        font-size: 0.9rem;
        color: ${({ theme }) => theme.colors.text};
        
        .icon {
          flex-shrink: 0;
        }
      }
    }
  }

  .task-actions {
    display: flex;
    gap: ${({ theme }) => theme.spacing(1)};
    align-items: center;
    
    button {
      padding: ${({ theme }) => theme.spacing(1)};
    }
  }

  .task-tags {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(1)};
    margin-top: ${({ theme }) => theme.spacing(1)};
  }

  .edit-container {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
    
    input {
      width: 100%;
    }
    
    .edit-actions {
      display: flex;
      gap: ${({ theme }) => theme.spacing(1)};
    }
  }
`;

export const CategoryBadge = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

export const TagContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

export const Tag = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  background: ${({ theme }) => theme.colors.hover};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
`;

export const PriorityBadge = styled.span<{ $priority: string }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  margin-left: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme, $priority }) =>
    $priority === 'high'
      ? theme.colors.danger
      : $priority === 'medium'
        ? theme.colors.secondary
        : theme.colors.success};
`;

export const RecurrenceBadge = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

export const NotesButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(1)};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NotesContent = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(3)};

  textarea {
    width: 100%;
    min-height: 100px;
    padding: ${({ theme }) => theme.spacing(2)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const DateLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing(0.5)}
    ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.colors.hover};
  border-radius: ${({ theme }) => theme.radii.md};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;
