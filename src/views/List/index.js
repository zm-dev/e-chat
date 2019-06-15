import React from 'react';
import NewsItem from '@/components/NewsItem';
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
      console.log(res.data);
    });
  }

  render() {
    const { history } = this.props;
    const { messageList } = this.state;
    return (
      <div className={styles.list}>
        {messageList.map((item, index) => {
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
        })}
      </div>
    );
  }
}
