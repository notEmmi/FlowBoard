import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FlowBoard home page', () => {
  render(<App />);
  const headingElement = screen.getByText(/Welcome to FlowBoard/i);
  expect(headingElement).toBeInTheDocument();
});
