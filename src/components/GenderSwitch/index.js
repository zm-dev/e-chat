import * as React from 'react';
import styles from './index.module.scss';

export const gender_map = {
  '男': { icon: 'icon-icon-gender-man', color: '#20a0ff'},
  '女': { icon: 'icon-icon-gender-woman', color: '#f50'},
  '保密': { icon: 'icon-bianjibaomi', color: 'orange'}
};
export default ({active, onChange = () => {}}) => {
  return <div className={styles.gender_switch}>
    <span>{active}</span>
    {
      Object.keys(gender_map).map(key => <i key={key} onClick={() => onChange(key)} style={{color: active === key ? gender_map[key].color : '#eee'}} className={`iconfont ${gender_map[key].icon}`} />)
    }
    
  </div>
}