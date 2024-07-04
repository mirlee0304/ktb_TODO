import './App.css';
import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { text, completed: false };
    setTodos([...todos, newTodo]);
};

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i!==index);
    setTodos(newTodos);
  }

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Todo List</h1>
        <TodoInput addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      </header>
    </div>
  );
}

export default App;
