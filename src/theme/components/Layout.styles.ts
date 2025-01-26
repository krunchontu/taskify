import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
  width: 100%;
  flex-grow: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
