import axios from 'axios';

export const getToken = async (code) => {
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
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw new Error('토큰을 가져오는 중 오류가 발생했습니다.');
  }
};

export const getUserInfo = async (accessToken) => {
  try {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = response.data;
    // 세션 스토리지에 사용자 정보와 토큰 저장
    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Error getting user info:', error);
    throw new Error('사용자 정보를 가져오는 중 오류가 발생했습니다.');
  }
};
