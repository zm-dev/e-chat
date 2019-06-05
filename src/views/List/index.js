import React from 'react';
import NewsItem from '@/components/NewsItem';
import styles from './index.module.scss';

export default class List extends React.PureComponent {
  render() {
    const { history } = this.props;

    return (
      <div className={styles.list}>
        {[1, 2, 3, 4, 5].map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                history.push('/chat');
              }}
            >
              <NewsItem />
            </div>
          );
        })}
      </div>
    );
  }
}
