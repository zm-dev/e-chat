import http from '@/common/http';

export default {
  // 获取聊天记录
  record(params) {
    return http.get('/record', { params });
  },

  // 获取用户详情
  userDetail(id) {
    return http.get(`/user/${id}`);
  },
};
