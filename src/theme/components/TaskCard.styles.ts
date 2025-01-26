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
  ${({ $completed }) => $completed && css`
    text-decoration: line-through;
    color: ${({ theme }) => theme.colors.completed};
  `}
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
