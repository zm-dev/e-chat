import React from 'react';
import ChatItem from '@/components/ChatItem';
import Emoji from '@/components/Emoji';
import commonApis from '@/serverApis/common';
import styles from './index.module.scss';
import { RecordContext, MeContext } from '../main';

class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.scrollTop = 0;
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      showEmoji: false,
      chatMessage: '',
      friend: {},
      page: 1,
      size: 20,
    };
  }

  componentWillMount(){
    window.addEventListener('scroll', this.handleScroll)
    document.documentElement.scrollTop = document.body.scrollHeight;
  }

  componentWillUnmount(){
    window.removeEventListener('scroll',this.handleScroll)
  }

  async handleScroll () {
    const {create, match, size, record} = this.props;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const newPage = record.current + 1;
    if (scrollTop === 0) {
      if (record.pages >= newPage) {
        document.documentElement.scrollTop = document.body.offsetHeight;
        await create({ user_id_b: match.params.id, page: newPage, size });
      }
    } 
  }

  async componentDidMount() {
    const { match, create, setRead } = this.props;
    const { page, size } = this.state;
    await create({ user_id_b: match.params.id, page, size });
    const { data } = await commonApis.getUser(match.params.id);
    this.setState({ friend: data });
    setRead();
  }

  render() {
    const { history, match, record, update } = this.props;
    const { showEmoji, friend, chatMessage } = this.state;
    return <MeContext.Consumer>
      {({me}) =>
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
            {record.records && <span className={styles.chatTips}>{record.records.length <= 0 ? '可以开始聊天啦' : record.pages > record.current ? '上拉加载更多' : '没有更多了'}</span>}
            {record.records &&
              record.records.map((item, index) => {
                const isMe = item.from_id !== Number(match.params.id);
                return <ChatItem
                  user={isMe ? me : friend}
                  content={item}
                  onClick={() => history.push({ pathname: isMe ? '/main/home/me' : `/main/home/me/${friend.id}`})}
                  key={index}
                  isSend={isMe}
                />
              })
            }
          </div>
          <div
            className={styles.footer}
            style={{ transform: `translateY(${!showEmoji ? '250' : '0'}px)` }}
          >
            <div className={styles.input_box}>
              <input type="text" value={chatMessage} onChange={(e) => {
                this.setState({chatMessage: e.target.value});
              }} />
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
                <button onClick={() => {
                  if (chatMessage.trim().length <= 0) return;
                  const now = new Date();
                  const data = {
                    created_at: now,
                    from_id: me.id,
                    id: record.records.length + 1,
                    is_read: false,
                    msg: chatMessage,
                    to_id: Number(match.params.id),
                    updated_at: now
                  };
                  update(data);
                  this.setState({
                    chatMessage: '',
                  });
                  if (showEmoji) this.setState({
                    showEmoji: false,
                  });
                }} type="button">发送</button>
              </div>
            </div>
            <div className={styles.emoji}>
              <Emoji onSelect={(item) => {
                this.setState({chatMessage: chatMessage + item});
              }} />
            </div>
          </div>
        </div>
      }
    </MeContext.Consumer>
  } 
}

export default props => (
  <RecordContext.Consumer>
    {({ record, create, update, setRead }) => <Chat setRead={setRead} record={record} create={create} update={update} {...props} />}
  </RecordContext.Consumer>
);
