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
              history.goBack();
            }}
          >
            <i className="iconfont icon-jiantou" />
            <span>返回</span>
          </div>
          <p className={styles.title}>与 奶奶姑 聊天中...</p>
        </div>
        <div className={styles.content}>
          {new Array(10).fill(0).map((_, index) => <ChatItem key={index} isSend={index % 2 === 0} />)}
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
