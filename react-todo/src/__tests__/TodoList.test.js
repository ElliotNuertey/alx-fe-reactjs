import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {

    // Test initial render
    test('renders TodoList component correctly', () => {
        render(<TodoList />);

        // Check if the main heading is present
        expect(screen.getByText('Todo List')).toBeInTheDocument();

        // Check if the form elements are present
        expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
        expect(screen.getByText('Add Todo')).toBeInTheDocument();
    });

    // Test initial state (demo todos)
    test('renders initial todos', () => {
        render(<TodoList />);

        // Check if initial todos are rendered
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
        expect(screen.getByText('Write Tests')).toBeInTheDocument();

        // Check if the completed todo has line-through style
        const completedTodo = screen.getByText('Write Tests');
        expect(completedTodo).toHaveStyle('text-decoration: line-through');
    });

    // Test adding todos
    test('adds a new todo when form is submitted', async () => {
        const user = userEvent.setup();
        render(<TodoList />);

        const input = screen.getByPlaceholderText('Add a new todo');
        const addButton = screen.getByText('Add Todo');

        // Type a new todo
        await user.type(input, 'New Test Todo');

        // Submit the form
        await user.click(addButton);

        // Check if the new todo appears in the list
        expect(screen.getByText('New Test Todo')).toBeInTheDocument();

        // Check if the input is cleared after submission
        expect(input).toHaveValue('');
    });

    test('does not add empty todos', async () => {
        const user = userEvent.setup();
        render(<TodoList />);

        const addButton = screen.getByText('Add Todo');
        const initialTodos = screen.getAllByText(/Delete/);
        const initialCount = initialTodos.length;

        // Try to submit without typing anything
        await user.click(addButton);

        // Count should remain the same
        const todosAfter = screen.getAllByText(/Delete/);
        expect(todosAfter).toHaveLength(initialCount);
    });

    test('does not add todos with only whitespace', async () => {
        const user = userEvent.setup();
        render(<TodoList />);

        const input = screen.getByPlaceholderText('Add a new todo');
        const addButton = screen.getByText('Add Todo');
        const initialTodos = screen.getAllByText(/Delete/);
        const initialCount = initialTodos.length;

        // Type only spaces
        await user.type(input, '   ');
        await user.click(addButton);

        // Count should remain the same
        const todosAfter = screen.getAllByText(/Delete/);
        expect(todosAfter).toHaveLength(initialCount);
    });

    // Test toggling todos
    test('toggles todo completion status when clicked', async () => {
        const user = userEvent.setup();
        render(<TodoList />);

        const todoText = screen.getByText('Learn React');

        // Initially should not be completed (no line-through)
        expect(todoText).toHaveStyle('text-decoration: none');

        // Click to toggle
        await user.click(todoText);

        // Should now be completed (line-through)
        expect(todoText).toHaveStyle('text-decoration: line-through');

        // Click again to toggle back
        await user.click(todoText);

        // Should be back to not completed
        expect(todoText).toHaveStyle('text-decoration: none');
    });

    test('toggles completed todo to incomplete', async () => {
        const user = userEvent.setup();
        render(<TodoList />);

        const completedTodo = screen.getByText('Write Tests');

        // Initially should be completed (line-through)
        expect(completedTodo).toHaveStyle('text-decoration: line-through');

        // Click to toggle
        await user.click(completedTodo);

        // Should now be incomplete (no line-through)
        expect(completedTodo).toHaveStyle('text-decoration: none');
    });

    // Test deleting todos
    test('deletes a todo when delete button is clicked', async () => {
        const user = userEvent.setup();
        render(<TodoList />);

        // Get the delete button for the first todo
        const deleteButtons = screen.getAllByText('Delete');
        const firstDeleteButton = deleteButtons[0];

        // Check that the todo exists before deletion
        expect(screen.getByText('Learn React')).toBeInTheDocument();

        // Click delete
        await user.click(firstDeleteButton);

        // Check that the todo is removed
        expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });

    test('deletes the correct todo when multiple exist', async () => {
        const user = userEvent.setup();
        render(<TodoList />);

        // Get all todos before deletion
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
        expect(screen.getByText('Write Tests')).toBeInTheDocument();

        // Find and click the delete button for the middle todo
        const todoItems = screen.getAllByText(/Delete/);
        const secondDeleteButton = todoItems[1]; // Second todo (Build a Todo App)

        await user.click(secondDeleteButton);

        // Check that only the correct todo is removed
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
        expect(screen.getByText('Write Tests')).toBeInTheDocument();
    });

    // Test form submission with Enter key
    test('adds todo when Enter key is pressed', async () => {
        const user = userEvent.setup();
        render(<TodoList />);

        const input = screen.getByPlaceholderText('Add a new todo');

        // Type a new todo and press Enter
        await user.type(input, 'Todo via Enter key{enter}');

        // Check if the new todo appears in the list
        expect(screen.getByText('Todo via Enter key')).toBeInTheDocument();

        // Check if the input is cleared
        expect(input).toHaveValue('');
    });

    // Test CSS classes
    test('applies correct CSS classes', () => {
        render(<TodoList />);

        // Check main container class
        const todoList = screen.getByText('Todo List').closest('div');
        expect(todoList).toHaveClass('todo-list');

        // Check form class
        const form = screen.getByPlaceholderText('Add a new todo').closest('form');
        expect(form).toHaveClass('add-todo-form');

        // Check input class
        const input = screen.getByPlaceholderText('Add a new todo');
        expect(input).toHaveClass('todo-input');

        // Check button class
        const addButton = screen.getByText('Add Todo');
        expect(addButton).toHaveClass('add-btn');

        // Check delete button class
        const deleteButtons = screen.getAllByText('Delete');
        expect(deleteButtons[0]).toHaveClass('delete-btn');
    });

    // Integration test
    test('full workflow: add, toggle, and delete todos', async () => {
        const user = userEvent.setup();
        render(<TodoList />);

        // Add a new todo
        const input = screen.getByPlaceholderText('Add a new todo');
        await user.type(input, 'Integration Test Todo');
        await user.click(screen.getByText('Add Todo'));

        // Verify it was added
        const newTodo = screen.getByText('Integration Test Todo');
        expect(newTodo).toBeInTheDocument();
        expect(newTodo).toHaveStyle('text-decoration: none');

        // Toggle it to completed
        await user.click(newTodo);
        expect(newTodo).toHaveStyle('text-decoration: line-through');

        // Toggle it back to incomplete
        await user.click(newTodo);
        expect(newTodo).toHaveStyle('text-decoration: none');

        // Delete it
        const deleteButtons = screen.getAllByText('Delete');
        const newTodoDeleteButton = deleteButtons.find(button =>
            button.closest('li').textContent.includes('Integration Test Todo')
        );
        await user.click(newTodoDeleteButton);

        // Verify it was deleted
        expect(screen.queryByText('Integration Test Todo')).not.toBeInTheDocument();
    });
});
