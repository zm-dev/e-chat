import * as React from 'react';
import styles from './index.module.scss';
export default ({info}) => {
  return <p className={styles.empty_status}>{info}</p>
};