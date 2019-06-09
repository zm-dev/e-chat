import React from 'react';
import { EmojiData } from '@/common/emoji';
import styles from './index.module.scss';

export default class Emoji extends React.PureComponent {
  render() {
    return (
      <div className={styles.emoji}>
        {EmojiData.map((item, itemIndex) => {
          return (
            <div key={itemIndex} className={styles.item_content}>
              <span className={styles.title}>{item.title}</span>
              <div className={styles.content}>
                {item.content.map((itemEmoji, index) => {
                  return <span key={index}>{itemEmoji}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
