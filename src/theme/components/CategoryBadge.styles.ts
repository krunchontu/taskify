import styled from 'styled-components';

export const CategoryBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primaryHover};
  color: ${({ theme }) => theme.colors.text};
`;
