import styled, { createGlobalStyle, css } from 'styled-components';
import { ThemeProvider } from 'styled-components';

export const theme = {
  light: {
    background: '#ffffff',
    text: '#2c3e50',
    primary: '#3498db',
    danger: '#e74c3c',
    border: '#dfe6e9',
    completed: '#95a5a6',
    hover: '#f8f9fa',
  },
  dark: {
    background: '#2d3436',
    text: '#ffffff',
    primary: '#2980b9',
    danger: '#c0392b',
    border: '#636e72',
    completed: '#7f8c8d',
    hover: '#404040',
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', system-ui;
    transition: background-color 0.3s, color 0.3s;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

export const TaskForm = styled.form`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
  grid-template-columns: 1fr auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const DateTimeInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: filter 0.2s;
  
  ${({ variant = 'primary', theme }) => css`
    background-color: ${theme[variant]};
    color: white;
    
    &:hover {
      filter: brightness(0.9);
    }
  `}
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TaskItem = styled.li<{ completed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme, completed }) => 
    completed ? theme.hover : 'transparent'};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hover};
  }
`;

export const TaskContent = styled.div<{ completed: boolean }>`
  flex: 1;
  cursor: pointer;
  ${({ completed }) => completed && css`
    text-decoration: line-through;
    color: ${({ theme }) => theme.completed};
  `}
`;

export const DateLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.completed};
  margin-top: 0.25rem;
`;

export const ThemeToggle = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
