import { createGlobalStyle } from 'styled-components';
import { AppTheme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: AppTheme }>`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%; // 1rem = 10px
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui;
    font-size: ${({ theme }) => theme.fontSizes.base};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Accessibility improvements */
  [aria-busy="true"] {
    cursor: progress;
  }

  [aria-disabled="true"] {
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
  }
`;
