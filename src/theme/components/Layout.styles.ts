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

export const StyledTaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
