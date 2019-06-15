import moment from 'moment';

export function formatDateTime(date) {
  return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss');
}

export function formatDate(date) {
  return moment(new Date(date)).format('YYYY-MM-DD');
}
export function formatChatDate(date) {
  return moment(new Date(date)).format('MM-DD HH:mm:ss');
}

export function formatTime(date) {
  return moment(new Date(date)).format('MM-DD');
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time) / 1000;
  if (between < 60) {
    return '不到一分钟';
  } else if (between < 3600) {
    return ~~(between / 60) + '分钟前';
  } else if (between < 86400) {
    return ~~(between / 3600) + '小时前';
  } else if (between < 604800) {
    return ~~(between / 86400) + '天前';
  } else {
    return formatTime(time);
  }
}
