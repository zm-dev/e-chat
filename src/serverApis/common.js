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

  // 获取个人信息
  getMe() {
    return http.get('/auth/me');
  },

  // 修改个人信息
  editMe(data) {
    return http.put('/auth/me', data);
  },

  // 上传图片
  uploadImage(file) {
    return http.post('/upload_image', file);
  },

  // 获取用户信息
  getUser (id) {
    return http.get(`user/${id}`);
  },
};
