import styled, { css } from 'styled-components';

export const TaskItem = styled.li<{ completed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme, completed }) => 
    completed ? theme.colors.hover : 'transparent'};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const TaskContent = styled.div<{ completed: boolean }>`
  flex: 1;
  cursor: pointer;
  ${({ completed }) => completed && css`
    text-decoration: line-through;
    color: ${({ theme }) => theme.colors.completed};
  `}
`;

export const DateLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.completed};
  margin-top: ${({ theme }) => theme.spacing(0.25)};
`;
