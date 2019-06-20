import React from 'react';
import Avatar from '@/components/Avatar';
import { formatChatDate } from '@/common/utils';
import styles from './index.module.scss';

export default class ChatItem extends React.PureComponent {
  render() {
    const { isSend = false, user, content, onClick = () => {} } = this.props;
    return (
      <div className={[styles.chat_item, isSend ? styles.right : ''].join(' ')}>
        <div onClick={onClick} className={styles.header_img}>
          <Avatar textSize={14} src={user.avatar_url} title={user.nick_name} />
        </div>
        <span className={styles.time}>{formatChatDate(content.created_at)}</span>
        <div className={styles.content_wrapper}>
          <div className={styles.content}>{content.msg}</div>
        </div>
       {/* {isSend && <span className={styles.read_status} style={{textAlign: isSend ? 'right' : 'left'}}>{content.is_read ? '已读' : '未读'}</span>} */}
      </div>
    );
  }
}
