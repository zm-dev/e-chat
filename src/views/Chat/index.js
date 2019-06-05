import React from 'react';
import ChatItem from '@/components/ChatItem';
import styles from './index.module.scss';

export default class Chat extends React.PureComponent {
  render() {
    const { history } = this.props;
    return (
      <div className={styles.chat}>
        <div className={styles.header}>
          <div
            className={styles.return}
            onClick={() => {
              history.push('home');
            }}
          >
            <i className="iconfont icon-jiantou" />
            <span>返回</span>
          </div>
          <p className={styles.title}>与 奶奶姑 聊天中...</p>
        </div>
        <div className={styles.content}>
          <ChatItem isSend />
          <ChatItem />
          <ChatItem isSend />
          <ChatItem />
          <ChatItem />
          <ChatItem isSend />
          <ChatItem isSend />
          <ChatItem />
          <ChatItem />
          <ChatItem isSend />
          <ChatItem isSend />
        </div>
        <div className={styles.footer}>
          <input type="text" />
          <div className={styles.operation}>
            <i className="iconfont icon-xiaolian" />
            <button type="button">发送</button>
          </div>
        </div>
      </div>
    );
  }
}
