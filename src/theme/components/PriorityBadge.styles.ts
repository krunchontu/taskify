import styled from 'styled-components';

export const PriorityBadge = styled.div<{ $priority: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${({ theme, $priority }) => 
    theme.colors[`${$priority}PriorityBg`]};
  color: ${({ theme, $priority }) => 
    theme.colors[`${$priority}PriorityText`]};
  margin-left: 8px;
`;
