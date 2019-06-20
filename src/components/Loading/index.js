import * as React from 'react';
import styles from './index.module.scss';

export default ({children, loading, info}) => {
  return <div className={styles.loading}>
    {loading && <div className={styles.loadingContainer}>
      <span className="iconfont icon-loading"/>
      {info && <p className={styles.loadingTip}>{info}</p>}
    </div>}    
    {children}
  </div>
}