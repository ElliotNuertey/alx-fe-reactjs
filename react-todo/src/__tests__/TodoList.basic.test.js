import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component Tests', () => {
    test('renders TodoList component', () => {
        render(<TodoList />);
        expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

    test('displays initial todos', () => {
        render(<TodoList />);
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
        expect(screen.getByText('Write Tests')).toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add a new todo');
        const button = screen.getByText('Add Todo');

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(button);

        expect(screen.getByText('New Todo')).toBeInTheDocument();
    });

    test('toggles todo completion', () => {
        render(<TodoList />);
        const todoItem = screen.getByText('Learn React');

        // Initially not completed
        expect(todoItem).toHaveStyle('text-decoration: none');

        // Click to toggle
        fireEvent.click(todoItem);
        expect(todoItem).toHaveStyle('text-decoration: line-through');
    });

    test('deletes a todo', () => {
        render(<TodoList />);
        const deleteButton = screen.getAllByText('Delete')[0];

        expect(screen.getByText('Learn React')).toBeInTheDocument();
        fireEvent.click(deleteButton);
        expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });
});
