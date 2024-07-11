import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, deleteTodo, toggleTodo }) {
    return (
        <li>
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={toggleTodo} 
            />
            <span>{todo.text}</span>
            <button onClick={deleteTodo}>Delete</button>
        </li>
    );
}

export default TodoItem;