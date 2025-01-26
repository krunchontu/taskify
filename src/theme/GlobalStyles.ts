import { createGlobalStyle } from 'styled-components';
import { AppTheme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: AppTheme }>`
  * {
    box-sizing: border-box;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  body {
    margin: 0;
    font-family: 'Segoe UI', system-ui;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
  }
`;
