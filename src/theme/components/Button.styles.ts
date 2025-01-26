import styled, { css } from 'styled-components';
import { AppTheme } from '../theme';
import { animationMixin, fadeIn } from '../animations';

export const Button = styled.button<{ 
  variant?: 'primary' | 'danger' | 'text'
  $isLoading?: boolean
}>`
  ${({ theme, variant = 'primary', $isLoading }) => css`
    padding: ${theme.spacing(1.5)} ${theme.spacing(3)};
    border: none;
    border-radius: ${theme.radii.md};
    cursor: ${$isLoading ? 'progress' : 'pointer'};
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: ${theme.spacing(1)};
    position: relative;
    overflow: hidden;
    ${animationMixin(fadeIn)};

    ${variant === 'primary' && css`
      background: ${theme.gradients.primary};
      color: ${theme.colors.surface};
      box-shadow: ${theme.shadows.sm};
    `}

    ${variant === 'danger' && css`
      background: ${theme.colors.danger};
      color: ${theme.colors.surface};
    `}

    ${variant === 'success' && css`
      background: ${theme.colors.success};
      color: ${theme.colors.surface};
    `}

    ${variant === 'text' && css`
      background: transparent;
      color: ${theme.colors.primary};
      padding: ${theme.spacing(0.5)};
      
      &:hover {
        background: ${theme.colors.hover};
      }
    `}

    &:disabled {
      ${variant === 'text' && css`
        color: ${theme.colors.disabled};
      `}
    }

    &:hover:not(:disabled) {
      filter: brightness(0.95);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `}
`;
