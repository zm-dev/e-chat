import * as React from 'react';
import styles from './index.module.scss';
export default props => {
  const {color_map, active, onChange = () => {}} = props;
  return (
    <div className={styles.contact_tab}>
      {Object.keys(color_map).map(item => <p onClick={() => onChange(item)} style={{background: active === item && color_map[item].background, color: active === item && color_map[item].color}} key={item}>{item}</p>)}
    </div>
  )
}