import moment from 'moment';

export function formatDateTime(date) {
  return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss');
}

export function formatDate(date) {
  return moment(new Date(date)).format('YYYY-MM-DD');
}
