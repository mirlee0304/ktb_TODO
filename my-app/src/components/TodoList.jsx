import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import './TodoList.css';

function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = (text) => {
        const newTodo = { text, completed: false };
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const toggleTodo = (index) => {
        const newTodos = todos.map((todo, i) => 
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    return (
        <div>
            <TodoInput addTodo={addTodo} />
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {todos.map((todo, index) => (
                    <TodoItem 
                        key={index} 
                        todo={todo} 
                        deleteTodo={() => deleteTodo(index)} 
                        toggleTodo={() => toggleTodo(index)} 
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
