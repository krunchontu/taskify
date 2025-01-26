import { DefaultTheme } from 'styled-components';

export type ThemeVariant = 'light' | 'dark';

export interface AppTheme extends DefaultTheme {
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  variant: ThemeVariant;
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    success: string;
    background: string;
    surface: string;
    primaryHover: string;
    text: string;
    border: string;
    disabled: string;
    hover: string;
    completed: string;
    primaryHover: string;
    secondaryHover: string;
    dangerHover: string;
  };
  spacing: (multiplier?: number) => string;
  breakpoints: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: string;
    h2: string;
    h3: string;
    body: string;
    caption: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  radii: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  gradients: {
    primary: string;
    surface: string;
  };
  transitions: {
    default: string;
    easeInOut: string;
  };
}

export const baseTheme: AppTheme = {
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  breakpoints: { sm: 480, md: 768, lg: 992, xl: 1200 },
  spacing: (multiplier = 1) => `${0.5 * multiplier}rem`,
  radii: { sm: '4px', md: '8px', lg: '16px', full: '9999px' },
  typography: {
    h1: '2rem',
    h2: '1.5rem',
    h3: '1.25rem',
    body: '1rem',
    caption: '0.875rem',
  },
  // Light theme defaults
  variant: 'light',
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    danger: '#e74c3c',
    success: '#27ae60',
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#2c3e50',
    border: '#dfe6e9',
    disabled: '#95a5a6',
    hover: '#f8f9fa',
    completed: '#95a5a6',
    primaryHover: '#2980b9',
    secondaryHover: '#27ae60',
    dangerHover: '#c0392b',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
    surface: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
    primaryHover: 'linear-gradient(135deg, #2980b9 0%, #1f618d 100%)',
  },
  transitions: {
    default: 'all 0.2s ease',
    easeInOut: 'all 0.2s ease-in-out',
  },
};

export const darkThemeOverrides: Partial<AppTheme> = {
  variant: 'dark',
  colors: {
    ...baseTheme.colors,
    primary: '#2980b9',
    danger: '#e74c3c',
    secondary: '#27ae60',
    success: '#2ecc71',
    background: '#2d3436',
    surface: '#404040',
    text: '#ffffff',
    border: '#636e72',
    disabled: '#7f8c8d',
    hover: '#404040',
    completed: '#7f8c8d',
    primaryHover: '#1f618d',
    secondaryHover: '#2ecc71',
    dangerHover: '#c0392b',
  },
  gradients: {
    ...baseTheme.gradients,
    surface: 'linear-gradient(145deg, #404040 0%, #2d3436 100%)',
    primary: 'linear-gradient(135deg, #2980b9 0%, #1f618d 100%)',
    primaryHover: 'linear-gradient(135deg, #1f618d 0%, #145a86 100%)',
  },
  transitions: {
    ...baseTheme.transitions,
  },
};
