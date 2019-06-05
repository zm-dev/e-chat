import React from 'react';
import styles from './index.module.scss';

export default props => {
  const { title, src, textSize = 20, textColor = '#f56a00', bgColor = '#fde3cf' } = props;
  return (
    <div className={styles.avatar} title={title}>
      {src ? (
        <img src={src} alt={title} />
      ) : (
        <div
          className={styles.text}
          style={{ color: textColor, backgroundColor: bgColor, fontSize: textSize }}
        >
          {title
            ? title
                .trim()
                .replace('【', '')
                .slice(0, 1)
            : '无'}
        </div>
      )}
    </div>
  );
};
