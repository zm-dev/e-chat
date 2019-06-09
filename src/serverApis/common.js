import http from '@/common/http';

export default {
  // 登陆
  signIn(userinfo) {
    return http.post('/auth/login', userinfo);
  },

  // 注册
  signUp(userinfo) {
    return http.post('/auth/register', userinfo);
  },
};
