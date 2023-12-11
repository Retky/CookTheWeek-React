import { render, screen } from '@testing-library/react';
import setupTests from './setupTests';
import App from '../pages/DefaultApp';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
