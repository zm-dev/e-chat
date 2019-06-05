import React from 'react';
import styles from './index.module.scss';

export default class ChatItem extends React.PureComponent {
  render() {
    const { isSend = false } = this.props;
    return (
      <div className={[styles.chat_item, isSend ? styles.right : ''].join(' ')}>
        <img
          className={styles.header_img}
          src="http://p2.pstatp.com/large/1253/8577488335"
          alt=""
        />
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
