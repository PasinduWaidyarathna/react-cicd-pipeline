import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock the environment variables
process.env.REACT_APP_ENVIRONMENT = 'test';
process.env.REACT_APP_VERSION = '1.0.0-test';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('theme toggle changes theme', async () => {
    render(<App />);
    const themeToggle = screen.getByLabelText(/Switch to light mode/i);
    
    // Initial theme should be dark
    expect(document.body.className).toBe('dark');
    
    // Click theme toggle
    fireEvent.click(themeToggle);
    
    // Theme should change to light
    await waitFor(() => {
      expect(document.body.className).toBe('light');
    });
    
    // Verify localStorage was updated
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  test('todo list functionality works correctly', async () => {
    render(<App />);
    
    // Navigate to Todo List tab
    const todoTab = screen.getByText(/Todo List/i);
    fireEvent.click(todoTab);
    
    // Add a new todo
    const todoInput = await screen.findByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add/i);
    
    userEvent.type(todoInput, 'Test todo item');
    fireEvent.click(addButton);
    
    // Check if todo was added
    expect(screen.getByText(/Test todo item/i)).toBeInTheDocument();
    
    // Toggle todo completion
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // Todo should be marked as completed
    const todoItem = screen.getByText(/Test todo item/i).closest('li');
    expect(todoItem).toHaveClass('completed');
    
    // Delete todo
    const deleteButton = screen.getByText('×');
    fireEvent.click(deleteButton);
    
    // Todo should be removed
    expect(screen.queryByText(/Test todo item/i)).not.toBeInTheDocument();
  });

  test('timer functionality works correctly', async () => {
    render(<App />);
    
    // Navigate to Timer tab
    const timerTab = screen.getByText(/Timer/i);
    fireEvent.click(timerTab);
    
    // Initial timer should be at 00:00.00
    expect(screen.getByText(/00:00.00/i)).toBeInTheDocument();
    
    // Start button should be present
    const startButton = screen.getByText(/Start/i);
    expect(startButton).toBeInTheDocument();
    
    // Reset button should be disabled initially
    const resetButton = screen.getByText(/Reset/i);
    expect(resetButton).toBeDisabled();
    
    // Lap button should be disabled initially
    const lapButton = screen.getByText(/Lap/i);
    expect(lapButton).toBeDisabled();
  });

  test('footer is rendered correctly', () => {
    render(<App />);
    const footerElement = screen.getByText(/This app demonstrates CI\/CD with GitHub Actions/i);
    expect(footerElement).toBeInTheDocument();
    
    const currentYear = new Date().getFullYear();
    const copyrightElement = screen.getByText(new RegExp(`© ${currentYear}`, 'i'));
    expect(copyrightElement).toBeInTheDocument();
  });
});