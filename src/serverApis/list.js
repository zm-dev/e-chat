import http from '@/common/http';

export default {
  // 获取记录
  messageList() {
    return http.get('/message_list');
  },
  // 获取老师列表
  getTeacherList() {
    return http.get('/teacher_list');
  },
  // 获取聊天记录
  getRecordList (id, params) {
    return http.get('record', {
      params
    });
  }
};
