import React from 'react';
import Avatar from '@/components/Avatar';
import { timeAgo } from '@/common/utils';
import styles from './index.module.scss';

export default class NewsItem extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className={[styles.news_item, !data.is_online && styles.not_online].join(' ')}>
        {/* <div className={styles.news_item}> */}
        <div className={styles.header_img}>
          <Avatar title={data.nick_name} src={data.avatar_url} />
        </div>
        <div className={styles.info_wrapper}>
          <div className={styles.info}>
            <span className={styles.name}>{data.nick_name || '匿名用户'}</span>
            <span className={styles.news}>{data.last_message || '暂无聊天记录'}</span>
          </div>
          <div className={styles.tips}>
            <span className={styles.time}>{timeAgo(new Date(data.last_message_send_time))}</span>
            {data.not_read_msg_count !== 0 && <span className={styles.count}>10</span>}
          </div>
        </div>
      </div>
    );
  }
}
