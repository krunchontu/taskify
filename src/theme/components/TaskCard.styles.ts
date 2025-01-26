import styled, { css } from 'styled-components';

export const TaskItem = styled.li<{ $completed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  ${({ $completed }) => $completed && css`
    opacity: 0.7;
    background: ${({ theme }) => theme.colors.hover};
  `}
`;

export const TaskContent = styled.div<{ $completed: boolean }>`
  flex: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  ${({ $completed }) => $completed && css`
    text-decoration: line-through;
    color: ${({ theme }) => theme.colors.completed};
  `}

  input {
    flex: 1;
    padding: ${({ theme }) => theme.spacing(1)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
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
  color: ${({ theme }) => theme.colors.textSecondary};
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
    $priority === 'high' ? theme.colors.danger :
    $priority === 'medium' ? theme.colors.secondary :
    theme.colors.success
  };
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
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: ${({ theme }) => theme.spacing(1)};
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};

  &:hover {
    text-decoration: underline;
  }
`;

export const NotesContent = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.hover};
  border-radius: ${({ theme }) => theme.radii.md};

  textarea {
    width: 100%;
    min-height: 80px;
    padding: ${({ theme }) => theme.spacing(1.5)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    font-family: inherit;
    resize: vertical;
  }
`;

export const DateLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) => theme.colors.hover};
  border-radius: ${({ theme }) => theme.radii.md};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;
