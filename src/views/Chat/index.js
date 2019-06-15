import React from 'react';
import ChatItem from '@/components/ChatItem';
import Emoji from '@/components/Emoji';
import chatApi from '@/serverApis/chat';
import styles from './index.module.scss';

export default class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showEmoji: false,
      recordList: [],
      userDetail: {},
      page: 1,
      size: 10,
      user_id_b: Number(props.match.params.id), // 聊天者ID
      sendVal: '',
    };
  }
  componentDidMount() {
    this.getRecord();
    this.getUserDetail();
  }

  // 获取消息列表

  getRecord = () => {
    const { page, size, user_id_b } = this.state;
    chatApi.record({ page, size, user_id_b }).then(res => {
      this.setState({
        recordList: res.data.records,
      });
    });
  };

  // 获取用户详情
  getUserDetail = () => {
    const { user_id_b } = this.state;
    chatApi.userDetail(user_id_b).then(res => {
      this.setState({
        userDetail: res.data,
      });
    });
  };

  render() {
    const { history } = this.props;
    const { showEmoji, recordList, user_id_b, userDetail, sendVal } = this.state;
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
          <p className={styles.title}>与 {userDetail.name} 聊天中...</p>
          <i
            onClick={() => {
              history.push(`/home/me/${user_id_b}`);
            }}
            className={['iconfont', 'icon-iconyonghu', styles.user_icon].join(' ')}
          />
        </div>
        <div className={styles.content} style={{ paddingBottom: showEmoji ? '300px' : '50px' }}>
          {recordList.map(item => (
            <ChatItem
              key={item.id}
              data={item}
              info={userDetail}
              isSend={item.from_id === user_id_b ? true : false}
            />
          ))}
        </div>
        <div
          className={styles.footer}
          style={{ transform: `translateY(${!showEmoji ? '250' : '0'}px)` }}
        >
          <div className={styles.input_box}>
            <input
              type="text"
              value={sendVal}
              onChange={e => {
                this.setState({
                  sendVal: e.target.value,
                });
              }}
              onFocus={() => {
                this.setState({
                  showEmoji: false,
                });
              }}
            />
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
            <Emoji
              onSelect={emoji => {
                this.setState({
                  sendVal: sendVal + emoji,
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
