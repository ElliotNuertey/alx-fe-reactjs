import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './components/TodoList';

// Initial render test
test('renders TodoList component correctly', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
});

// Test initial state
test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
});

// Test adding todos
test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    expect(input.value).toBe('');
});

// Test toggling todos
test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    const todoText = screen.getByText('Learn React');

    expect(todoText).toHaveStyle('text-decoration: none');
    fireEvent.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: line-through');
});

// Test deleting todos
test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    const deleteButton = screen.getAllByText('Delete')[0];

    expect(screen.getByText('Learn React')).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});
