import './App.css';
import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      getToken(code);
    }
  }, []);

  const getToken = async (code) => {
    try {
      const response = await axios.post(
        `https://kauth.kakao.com/oauth/token`,
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            code,
          },
        }
      );
      setToken(response.data.access_token);
      getUserInfo(response.data.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfo = async (accessToken) => {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleKakaoLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setTodos([]);
    window.location.href = '/'; // 로그아웃 후 홈으로 리다이렉트
  };

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <>
            <h1>Your Todo List</h1>
            <button onClick={handleKakaoLogin}>카카오 로그인</button>
          </>
        ) : (
          <>
            {user && user.properties && <div>{user.properties.nickname}님 환영합니다!</div>}
            <button onClick={handleLogout}>로그아웃</button>
            <TodoInput addTodo={addTodo} />
            <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
