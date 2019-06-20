import * as React from 'react';
import Avatar from '@/components/Avatar';
import styles from './index.module.scss';

const genderMap = {
  '男': {
    icon: 'icon-icon-gender-man',
    color: '#20a0ff'
  },
  '女': {
    icon: 'icon-icon-gender-woman',
    color: '#f50'
  },
  '保密': {
    icon: 'icon-bianjibaomi',
    color: 'orange'
  }
};

export default ({data, color_map, index, onClick = () => {}}) => {
  return (
    <div onClick={() => onClick()} style={{animationDelay: index <= 20 && `${index * 0.05}s`}} className={styles.contact_card}>
      <div className={styles.info}>
        <div className={styles.info_avatar}>
          <Avatar radius='5px' src={data.avatar_url} title={data.nick_name} />
        </div>
        <div className={styles.info_text}>
          <p className={styles.nick_name}>{data.nick_name}<i style={{color: genderMap[data.gender].color}} className={`iconfont ${genderMap[data.gender].icon}`}/></p>
          <p className={styles.profile}>{data.profile || '无'}</p>
          <p style={{color: color_map[data.group].color, background: color_map[data.group].background}} className={styles.group}>{data.company || '无'}</p>
        </div>
        <span style={{color: data.is_online ? color_map[data.group].color : '#aaa'}}>{data.is_online ? '在线' : '离线'}</span>
      </div>
    </div>
  )
}