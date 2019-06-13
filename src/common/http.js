import axios from 'axios';
import Toast from '@/components/Toast';
import history from './history';
const baseURL = process.env.NODE_ENV === 'development' ? '/api/v1' : '/api/v1';
const http = axios.create({
  baseURL,
  timeout: 6000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// http.interceptors.request.use(
//   config => {
//     if (token) {
//       config.headers['Authorization'] = 'Bearer ' + token.accessToken;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      Toast.info('请求超时');
    } else if (error.response && error.response.status === 401) {
      // 处理401
      // 如果 access token 已过期 重新 refresh token，否则跳转到登录页面
      // const token = tokenStore.getToken();
      // if (token && !error.config.url.includes('/auth/refreshToken')) {
      //   return http
      //     .post('/auth/refreshToken', {
      //       refreshToken: token.refreshToken,
      //     })
      //     .then(res => {
      //       tokenStore.setToken(res.data.data);
      //       return http.request({
      //         ...error.config,
      //         url: error.config.url.replace(baseURL, ''),
      //       });
      //     });
      // } else {
        history.push('/signin');
        Toast.info('请先登录');
      // }
    } else {
      if (error.response && error.response.data) {
        Toast.info(error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

export default http;
