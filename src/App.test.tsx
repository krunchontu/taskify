import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Taskify App', () => {
  render(<App />);
  const appElement = screen.getByText(/Taskify App/i);
  expect(appElement).toBeInTheDocument();
});
