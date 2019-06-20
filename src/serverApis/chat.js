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
  setMsgRead (ids) {
    return http.put('/record/batch_set_read', {
      ids: ids
    })
  }
};
