import styled from 'styled-components';

interface PriorityBadgeProps {
  $priority?: 'low' | 'medium' | 'high';
}

export const PriorityBadge = styled.span<PriorityBadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${({ theme, $priority }) => {
    switch ($priority) {
      case 'high': return theme.colors.danger;
      case 'medium': return theme.colors.secondary;
      case 'low': return theme.colors.success;
      default: return theme.colors.primary;
    }
  }};
  color: ${({ theme }) => theme.colors.surface};
`;
