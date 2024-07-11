import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import { getToken, getUserInfo } from './auth';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        getToken(code)
          .then(token => {
            setToken(token);
            return getUserInfo(token);
          })
          .then(user => setUser(user))
          .catch(error => {
            console.error(error);
            setError('로그인 실패. 다시 시도해 주세요.');
          });
      }
    }
  }, []);

  const handleKakaoLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = '/'; // 로그아웃 후 홈으로 리다이렉트
  };

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <>
            <h1>Your Todo List</h1>
            <button onClick={handleKakaoLogin}>카카오 로그인</button>
            {error && <div className="error">{error}</div>}
          </>
        ) : (
          <>
            {user && user.properties && <div>{user.properties.nickname}님 환영합니다!</div>}
            <button onClick={handleLogout}>로그아웃</button>
            <TodoList />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
