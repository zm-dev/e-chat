import React from 'react';
import ChatItem from '@/components/ChatItem';
import Emoji from '@/components/Emoji';
import commonApis from '@/serverApis/common';
import styles from './index.module.scss';
import {RecordContext} from '@/index';
class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showEmoji: false,
      friend: {},
      page: 1,
      size: 2
    };
  }

  async componentDidMount () {
    const {match, update, record} = this.props;
    const {page, size} = this.state;
    await update({id: match.params.id, page, size});
    const {data} = await commonApis.getUser(match.params.id);
    this.setState({friend: data});
  }

  render() {
    const { history, record } = this.props;
    const { showEmoji, friend } = this.state;
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
            <p className={styles.title}>与 {friend.nick_name} 聊天中...</p>
          </div>
          <div className={styles.content} style={{ paddingBottom: showEmoji ? '300px' : '50px' }}>
            {record.records && record.records.map((_, index) => (
              <ChatItem onClick={() => history.push({pathname: `/home/me/${friend.id}`, state: friend})} key={index} isSend={index % 2 === 0} />
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

export default (props) => <RecordContext.Consumer>
{
  ({record, update})  => <Chat record={record} update={update} {...props} />
}
</RecordContext.Consumer>
