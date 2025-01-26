import styled from 'styled-components';

export const TaskForm = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  grid-template-columns: 1fr auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
  }
`;
