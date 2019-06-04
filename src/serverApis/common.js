import http from '@/common/http';

export default {
  // 获取分享信息
  shareInfo() {
    return http.get('me/shareInfo');
  },
};
