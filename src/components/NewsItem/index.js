import React from 'react';
import styles from './index.module.scss';

export default class NewsItem extends React.PureComponent {
  render() {
    return (
      // <div className={[styles.news_item, styles.not_online].join(' ')}>
      <div className={styles.news_item}>
        <img
          className={styles.header_img}
          src="http://p2.pstatp.com/large/1253/8577488335"
          alt=""
        />
        <div className={styles.info_wrapper}>
          <div className={styles.info}>
            <span className={styles.name}>奶奶姑子</span>
            <span className={styles.news}>含山特产，奶奶姑子扽汤。</span>
          </div>
          <div className={styles.tips}>
            <span className={styles.time}>22:30</span>
            <span className={styles.count}>10</span>
          </div>
        </div>
      </div>
    );
  }
}
