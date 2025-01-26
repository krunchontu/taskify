import { DefaultTheme } from 'styled-components';

export type ThemeVariant = 'light' | 'dark';

export interface AppTheme extends DefaultTheme {
  variant: ThemeVariant;
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    success: string;
    background: string;
    surface: string;
    text: string;
    border: string;
    disabled: string;
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
}

export const baseTheme: AppTheme = {
  breakpoints: { sm: 480, md: 768, lg: 992, xl: 1200 },
  spacing: (multiplier = 1) => `${0.5 * multiplier}rem`,
  radii: { sm: '4px', md: '8px', lg: '16px', full: '9999px' },
  typography: {
    h1: '2rem',
    h2: '1.5rem',
    h3: '1.25rem',
    body: '1rem',
    caption: '0.875rem'
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
    disabled: '#95a5a6'
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
    surface: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
  }
};

export const darkThemeOverrides: Partial<AppTheme> = {
  variant: 'dark',
  colors: {
    background: '#2d3436',
    surface: '#404040',
    text: '#ffffff',
    border: '#636e72',
    disabled: '#7f8c8d'
  },
  gradients: {
    surface: 'linear-gradient(145deg, #404040 0%, #2d3436 100%)'
  }
};
