import * as React from 'react';
import styles from './index.module.scss';

const gender_list = ['man', 'woman'];
export default ({active, onChange = () => {}}) => {
  return <div className={styles.gender_switch}>
    {
      gender_list.map(gender => <i key={gender} onClick={() => onChange(gender)} style={{color: active === gender ? gender === 'man' ? '#20a0ff' : '#f50' : '#eee'}} className={`iconfont icon-icon-gender-${gender}`} />)
    }
    
  </div>
}