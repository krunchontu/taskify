import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Taskify App', () => {
  render(<App />);
  const appElement = screen.getByText(/Taskify App/i);
  expect(appElement).toBeInTheDocument();
});
