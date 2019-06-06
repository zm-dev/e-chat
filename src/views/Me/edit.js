import * as React from 'react';
import LinkLine from '@/components/LinkLine';
import Avatar from '@/components/Avatar';
import GenderSwitch from '@/components/GenderSwitch';
import styles from './index.module.scss';
export default () => {
  const [gender, setGender] = React.useState('man');
  return (
    <div className={styles.edit}>
      <LinkLine
        label="头像"
        action={
          <div className={styles.edit_avatar}>
            <input style={{ width: '100%', height: 30, opacity: 0}} type="file" />
            <div style={{width: 30, height: 30}}>
              <Avatar textSize={14} />
            </div>
          </div>
        }
      />
      <LinkLine
        label="昵称"
        action={
          <input placeholder="请输入昵称" style={{textAlign: 'right'}} />
        }
      />
       <LinkLine
        label="性别"
        action={
          <GenderSwitch active={gender} onChange={(gender) => {
            setGender(gender);
          }} />
        }
      />
      <LinkLine
        label="组别"
        action={
          <span>辅导员</span>
        }
      />
      <LinkLine
        label="工作单位"
        action={
          <input placeholder="请输入工作单位" style={{textAlign: 'right'}} />
        }
      />
      <LinkLine
        label="简介"
        action={
          <input placeholder="请输入简介" style={{textAlign: 'right'}} />
        }
      />
      <p className={styles.save_btn}>保存资料</p>
    </div>
  )
}