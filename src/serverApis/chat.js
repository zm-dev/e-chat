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

  // 设置消息为已读
  setMsgRead (from_user_id) {
    return http.put('/record/set_all_read', {from_user_id})
  }
};
