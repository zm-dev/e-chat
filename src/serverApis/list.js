import http from '@/common/http';

export default {
  // 获取聊天记录
  messageList() {
    return http.get('/message_list');
  },
};
