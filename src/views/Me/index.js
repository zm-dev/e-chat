import * as React from 'react';
import {color_map} from '../Contact';
import Avatar from '@/components/Avatar';
import styles from './index.module.scss';
export default ({history}) => {
  return (
    <div className={styles.me}>
      <div className={styles.header}>
        <span onClick={() => history.goBack()} className="iconfont icon-jiantou"></span>
        <i style={{color: '#20a0ff'}} className="iconfont icon-icon-gender-woman" />
      </div>
      <div className={styles.me_avatar}>
        <Avatar />
      </div>
      <div className={styles.me_info}>
        <p className={styles.nick_name}>昵称<span style={{color: color_map['朋辈辅导员'].color, background: color_map['朋辈辅导员'].background}}>辅导员</span></p>
        <p className={styles.company}>工作单位</p>
        <p className={styles.profile}>用户简介</p>
      </div>
      <p onClick={() => history.push('/home/edit_me')}>修改资料</p>
      <p onClick={() => history.replace('/signin')}>退出登录</p>
    </div>
  );
}