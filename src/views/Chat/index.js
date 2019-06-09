import React from 'react';
import ChatItem from '@/components/ChatItem';
import Emoji from '@/components/Emoji';
import styles from './index.module.scss';

export default class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showEmoji: false,
    };
  }
  render() {
    const { history } = this.props;
    const { showEmoji } = this.state;
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
        <div className={styles.content} style={{ paddingBottom: showEmoji ? '300px' : '50px' }}>
          {new Array(10).fill(0).map((_, index) => (
            <ChatItem key={index} isSend={index % 2 === 0} />
          ))}
        </div>
        <div
          className={styles.footer}
          style={{ transform: `translateY(${!showEmoji ? '250' : '0'}px)` }}
        >
          <div className={styles.input_box}>
            <input type="text" />
            <div className={styles.operation}>
              <i
                onClick={() => {
                  this.setState({
                    showEmoji: !showEmoji,
                  });
                }}
                className="iconfont icon-xiaolian"
                style={{ color: !showEmoji ? '#6b7372' : '#4facfe' }}
              />
              <button type="button">发送</button>
            </div>
          </div>
          <div className={styles.emoji}>
            <Emoji />
          </div>
        </div>
      </div>
    );
  }
}
