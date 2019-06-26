import React from 'react';
import NewsItem from '@/components/NewsItem';
import EmptyStatus from '@/components/EmptyStatus';
import styles from './index.module.scss';
import {MessageContext} from '../main';
import Loading from '@/components/Loading';

export default class List extends React.PureComponent {

  render() {
    const { history } = this.props;
    return (
      <MessageContext.Consumer>
        {({messageMap, yetReadCount, messageLoading}) =>
         {
           console.log('inner', messageMap);
           return <Loading loading={messageLoading} info="正在加载数据"><div className={styles.list}>
            {!messageLoading || Object.keys(messageMap).length > 0 ? (
              Object.keys(messageMap).map(key => {
                return (
                  <div
                    key={key}
                    onClick={() => {
                      history.push(`/main/chat/${key}`);
                    }}
                  >
                    <NewsItem data={messageMap[key]} />
                  </div>
                );
              })
            ) : (
              <EmptyStatus info="暂无历史聊天" />
            )
          }
          </div></Loading>}
        }
      </MessageContext.Consumer>
    );
  }
}
