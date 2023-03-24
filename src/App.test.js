// src/App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import Foo from './Foo';
import App from './App';

it('renders without crashing', () => {
  render(<App />);
  const linkElement = screen.getByText(/foo/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});
