import React from 'react';
import Avatar from '@/components/Avatar';
import styles from './index.module.scss';

export default class ChatItem extends React.PureComponent {
  render() {
    const { isSend = false, onClick = () => {} } = this.props;
    return (
      <div className={[styles.chat_item, isSend ? styles.right : ''].join(' ')}>
        <div  onClick={() => onClick()} className={styles.chatAvatar} style={{width: 40, height: 40}}>
          <Avatar title="23" />
        </div>
        <span className={styles.time}>上午10:10</span>
        <div className={styles.content_wrapper}>
          <div className={styles.content}>
            我就是我是颜色不一样的烟火。我就是我是颜色不一样的烟火。
          </div>
        </div>
      </div>
    );
  }
}
