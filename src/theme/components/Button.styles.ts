import styled from 'styled-components';
import { animationMixin, fadeIn } from '../animations';

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'danger' | 'text' | 'success';
  $isLoading?: boolean;
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

    ${variant === 'primary' &&
    css`
      background: ${theme.gradients.primary};
      color: ${theme.colors.surface};
      box-shadow: ${theme.shadows.sm};
    `}

    ${variant === 'secondary' &&
    css`
      background: ${theme.colors.secondary};
      color: ${theme.colors.surface};
      border: 1px solid ${theme.colors.secondaryHover};

      &:hover:not(:disabled) {
        background: ${theme.colors.secondaryHover};
      }
    `}

    ${variant === 'danger' &&
    css`
      background: ${theme.colors.danger};
      color: ${theme.colors.surface};
    `}

    ${variant === 'success' &&
    css`
      background: ${theme.colors.success};
      color: ${theme.colors.surface};
    `}

    ${variant === 'text' &&
    css`
      background: transparent;
      color: ${theme.colors.primary};
      padding: ${theme.spacing(0.5)};

      &:hover {
        background: ${theme.colors.hover};
      }
    `}

    &:disabled {
      ${variant === 'text' &&
      css`
        color: ${theme.colors.disabled};
      `}
    }

    transition: all 0.2s ${theme.transitions.easeInOut};

    ${variant === 'primary' &&
    css`
      background: ${theme.gradients.primary};
      &:hover:not(:disabled) {
        background: ${theme.gradients.primaryHover};
      }
    `}

    ${variant === 'danger' &&
    css`
      background: ${theme.colors.danger};
      &:hover:not(:disabled) {
        background: ${theme.colors.dangerHover};
      }
    `}

    // Loading state enhancement
    ${$isLoading &&
    css`
      &::after {
        content: '';
        width: 1.2em;
        height: 1.2em;
        border: 2px solid currentColor;
        border-radius: 50%;
        border-right-color: transparent;
        animation: spin 0.6s linear infinite;
      }
    `}

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;
