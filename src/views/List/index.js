import React from 'react';
import NewsItem from '@/components/NewsItem';
import EmptyStatus from '@/components/EmptyStatus';
import listApi from '@/serverApis/list';
import styles from './index.module.scss';

export default class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
    };
  }

  componentDidMount() {
    listApi.messageList().then(res => {
      this.setState({
        messageList: res.data,
      });
    });
  }

  render() {
    const { history } = this.props;
    const { messageList } = this.state;
    return (
      <div className={styles.list}>
        {messageList.length > 0 ? (
          messageList.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  history.push(`/chat/${item.user_id}`);
                }}
              >
                <NewsItem data={item} />
              </div>
            );
          })
        ) : (
          <EmptyStatus info="暂无历史聊天" />
        )}
      </div>
    );
  }
}
