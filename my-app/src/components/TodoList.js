import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, deleteTodo, toggleTodo }) {
    return (
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
    );
}

export default TodoList;