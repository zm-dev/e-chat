import * as React from 'react';
import styles from './index.module.scss';

export default ({leading, label, action}) => {
  return <div className={styles.link_line}>
    {leading}
    <span className={styles.label}>{label}</span>
    {action ? action : <span className="iconfont icon-jiantou" />}
  </div>
}