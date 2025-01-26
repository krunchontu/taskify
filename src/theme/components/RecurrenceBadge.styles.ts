import styled from 'styled-components';

interface RecurrenceBadgeProps {
  $recurrence?: 'daily' | 'weekly' | 'monthly';
}

export const RecurrenceBadge = styled.span<RecurrenceBadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
  background-color: ${({ theme, $recurrence }) => {
    switch ($recurrence) {
      case 'daily': return theme.colors.primary;
      case 'weekly': return theme.colors.secondary;
      case 'monthly': return theme.colors.success;
    }
  }};
  color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
