import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build a Todo App', completed: false },
        { id: 3, text: 'Write Tests', completed: true }
    ]);

    const addTodo = (text) => {
        if (text.trim()) {
            const newTodo = {
                id: Date.now(),
                text: text.trim(),
                completed: false
            };
            setTodos([...todos, newTodo]);
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <span
                            onClick={() => toggleTodo(todo.id)}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="delete-btn"
                            style={{ marginLeft: '10px' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
