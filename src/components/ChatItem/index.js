import React from 'react';
import Avatar from '@/components/Avatar';
import { formatChatDate } from '@/common/utils';
import styles from './index.module.scss';

export default class ChatItem extends React.PureComponent {
  render() {
    const { isSend = false, info, data, onClick = () => {} } = this.props;
    return (
      <div className={[styles.chat_item, isSend ? styles.right : ''].join(' ')}>
        <div onClick={onClick} className={styles.header_img}>
          <Avatar src={info.avatarUrl} alt={info.name} />
        </div>
        <span className={styles.time}>{formatChatDate(data.updated_at)}</span>
        <div className={styles.content_wrapper}>
          <div className={styles.content}>{data.msg}</div>
        </div>
      </div>
    );
  }
}
