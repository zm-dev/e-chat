import React from 'react';
import styles from './index.module.scss';

export default props => {
  const { title, src, textSize = 20, textColor = '#f56a00', bgColor = '#fde3cf', radius = '50%' } = props;
  return (
    <div style={{borderRadius: radius}} className={styles.avatar} title={title}>
      {src ? (
        <div style={{height: '100%', background: `url(${src})`, backgroundSize: '100%', backgroundPosition: 'center'}} />
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
