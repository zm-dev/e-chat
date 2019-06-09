import * as React from 'react';
import styles from './index.module.scss';
export default props => {
  const {color_map} = props;
  const [active, setActive] = React.useState(0);
  return (
    <div className={styles.contact_tab}>
      {Object.keys(color_map).map((item, index) => <p onClick={() => setActive(index)} style={{background: active === index && color_map[item].background, color: active === index && color_map[item].color}} key={index}>{item}</p>)}
    </div>
  )
}