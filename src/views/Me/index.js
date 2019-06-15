import * as React from 'react';
import { color_map } from '../Contact';
import Avatar from '@/components/Avatar';
import styles from './index.module.scss';
import commonApis from '@/serverApis/common';
import { gender_map } from '@/components/GenderSwitch';

import { MeContext } from '@/index';
const Me = ({ history, me, match }) => {
  const [user, setUser] = React.useState({});
  const isMe = !match.params.id;
  const getUser = async () => {
    const { data } = await commonApis.getUser(match.params.id);
    setUser(data);
  };
  React.useEffect(() => {
    if (isMe) {
      setUser(me);
    } else {
      getUser();
    }
  });
  return (
    <div className={styles.me}>
      <div className={styles.header}>
        <span onClick={() => history.goBack()} className="iconfont icon-jiantou" />
        <i
          style={{ color: user.gender && gender_map[user.gender].color }}
          className={`iconfont ${user.gender && gender_map[user.gender].icon}`}
        />
      </div>
      <div className={styles.me_avatar}>
        <Avatar src={user.avatar_url} title={user.nick_name} />
      </div>
      <div className={styles.me_info}>
        <p className={styles.nick_name}>
          {user.nick_name}
          <span
            style={{
              color: color_map['朋辈辅导员'].color,
              background: color_map['朋辈辅导员'].background,
            }}
          >
            辅导员
          </span>
        </p>
        <p className={styles.company}>{user.company || '暂无工作单位'}</p>
        <p className={styles.profile}>{user.profile || '暂无简介'}</p>
      </div>
      {isMe && <p onClick={() => history.push('/home/edit_me')}>修改资料</p>}
      {isMe && <p onClick={() => history.replace('/signin')}>退出登录</p>}
    </div>
  );
};

export default props => (
  <MeContext.Consumer>{({ me }) => <Me me={me} {...props} />}</MeContext.Consumer>
);
