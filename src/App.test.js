import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders main heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Simple React App with CI\/CD Pipeline/i);
  expect(headingElement).toBeInTheDocument();
});

test('counter increments when button is clicked', () => {
  render(<App />);
  
  // Check initial count
  expect(screen.getByText(/You clicked the button 0 times/i)).toBeInTheDocument();
  
  // Click the button
  const buttonElement = screen.getByText(/Increment/i);
  fireEvent.click(buttonElement);
  
  // Check if count was incremented
  expect(screen.getByText(/You clicked the button 1 times/i)).toBeInTheDocument();
});

test('deployment info section is present', () => {
  render(<App />);
  const deploymentInfoSection = screen.getByText(/Deployment Info/i);
  expect(deploymentInfoSection).toBeInTheDocument();
  
  // Check if environment info is displayed
  expect(screen.getByText(/Environment:/i)).toBeInTheDocument();
  
  // Check if version info is displayed
  expect(screen.getByText(/Version:/i)).toBeInTheDocument();
});