import styled, { css } from 'styled-components';

export const InputGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex-direction: column;
  }
`;

export const DateTimeInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
  flex: 1;
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1.6)};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
