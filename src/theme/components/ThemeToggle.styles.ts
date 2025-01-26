import styled from 'styled-components';
import { AppTheme } from '../theme';

export const ThemeToggle = styled.button`
  position: fixed;
  top: ${({ theme }) => theme.spacing(2)};
  right: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;
