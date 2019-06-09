import * as React from 'react';
import Avatar from '@/components/Avatar';
import styles from './index.module.scss';

export default ({data, color_map, index, onClick = () => {}}) => {
  return (
    <div onClick={() => onClick()} style={{animationDelay: index <= 20 && `${index * 0.25}s`}} className={styles.contact_card}>
      <div className={styles.info}>
        <div className={styles.info_avatar}>
          <Avatar radius='5px' src={data.avatar_url} alt={data.nike_name} />
        </div>
        <div className={styles.info_text}>
          <p className={styles.nick_name}>{data.nike_name}<i style={{color: data.gender ? '#20a0ff' : '#f50'}} className={`iconfont icon-icon-gender-${data.gender ? 'man' : 'woman'}`}/></p>
          <p className={styles.profile}>{data.profile}</p>
          <p style={{color: color_map[data.group].color, background: color_map[data.group].background}} className={styles.group}>{data.company}</p>
        </div>
      </div>
    </div>
  )
}