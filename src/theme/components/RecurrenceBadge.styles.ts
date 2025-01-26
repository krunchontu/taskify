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
    if (!$recurrence) return theme.colors.border;
    switch($recurrence) {
      case 'daily': return theme.colors.blue100;
      case 'weekly': return theme.colors.purple100;
      case 'monthly': return theme.colors.green100;
    }
  }};
  color: ${({ theme, $recurrence }) => {
    if (!$recurrence) return theme.colors.text;
    switch($recurrence) {
      case 'daily': return theme.colors.blue600;
      case 'weekly': return theme.colors.purple600;
      case 'monthly': return theme.colors.green600;
    }
  }};
  border: 1px solid ${({ theme, $recurrence }) => {
    if (!$recurrence) return theme.colors.border;
    switch($recurrence) {
      case 'daily': return theme.colors.blue300;
      case 'weekly': return theme.colors.purple300;
      case 'monthly': return theme.colors.green300;
    }
  }};
`;
