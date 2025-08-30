/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

test('renders TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
});

test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
});

test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const button = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(button);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
});

test('toggles todo completion', () => {
    render(<TodoList />);
    const todo = screen.getByText('Learn React');

    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
});

test('deletes a todo', () => {
    render(<TodoList />);
    const deleteBtn = screen.getAllByText('Delete')[0];

    fireEvent.click(deleteBtn);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});
