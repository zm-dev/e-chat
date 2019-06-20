import * as React from 'react';
import LinkLine from '@/components/LinkLine';
import Avatar from '@/components/Avatar';
import commonApis from '@/serverApis/common';
import GenderSwitch from '@/components/GenderSwitch';
import styles from './index.module.scss';
import Loading from '@/components/Loading';

import {MeContext} from '../main';

const genderMap = {
  '男': 0,
  '女': 1,
  '保密': 2
}
 
const Edit = ({me, update, history}) => {
  const [meClone, setMeClone] = React.useState({
    nick_name: '',
    avatar_url: '',
    gender: '',
    group: '',
    company: '',
    profile: ''
  });
  const [avatarLoading, setAvatarLoading] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  React.useEffect(() => {
    me.nick_name && setMeClone({
      nick_name: me.nick_name,
      avatar_url: me.avatar_url,
      gender: me.gender,
      group: me.group,
      company: me.company,
      profile: me.profile
    });
  }, [me]);
  return <Loading info="正在提交数据" loading={submitLoading}>
      <div className={styles.edit}>
      <LinkLine
        label="头像"
        action={
          <div className={styles.edit_avatar}>
            <input onChange={async (e) => {
              setAvatarLoading(true);
              const formData = new FormData();
              formData.append("image", e.target.files[0]);
              const {data} = await commonApis.uploadImage(formData);
              setMeClone({...meClone, avatar_url: data.image_url, avatar_hash: data.image_hash});
              setAvatarLoading(false);
            }} style={{ width: '100%', height: 30, opacity: 0}} type="file" />
            <Loading loading={avatarLoading}>
              <div style={{width: 30, height: 30}}>
                <Avatar src={meClone.avatar_url} title={meClone.nick_name} textSize={14} />
              </div>
            </Loading>
          </div>
        }
      />
      <LinkLine
        label="昵称"
        action={
          <input onChange={(e) => {
            setMeClone({...meClone, nick_name: e.target.value});
          }}
          value={meClone.nick_name}
          className={styles.inputContainer}
          placeholder="请输入昵称"
          style={{textAlign: 'right'}} />
        }
      />
      <LinkLine
        label="性别"
        action={
          <GenderSwitch active={meClone.gender} onChange={(gender) => {
            setMeClone({...meClone, gender});
          }} />
        }
      />
      <LinkLine
        label="组别"
        action={
          <span style={{color: '#aaa'}}>{meClone.group || '无'}</span>
        }
      />
      <LinkLine
        label="工作单位"
        action={
          <input onChange={(e) => {
            setMeClone({...meClone, company: e.target.value});
          }} 
          value={meClone.company}
          className={styles.inputContainer}
          placeholder="请输入工作单位"
          style={{textAlign: 'right'}} />
        }
      />
      <LinkLine
        label="简介"
        action={
          <input value={meClone.profile}
          className={styles.inputContainer}
          onChange={(e) => {
            setMeClone({...meClone, profile: e.target.value});
          }} placeholder="请输入简介" style={{textAlign: 'right'}} />
        }
      />
      
        <p onClick={async () => {
          setSubmitLoading(true);
          Object.assign(meClone, {gender: genderMap[meClone.gender]})
          update(meClone);
          try {
            await commonApis.editMe(meClone);
            setSubmitLoading(false); 
            history.goBack();
          } catch (e) {
            setSubmitLoading(false); 
          }
        }
      } className={styles.save_btn}>保存资料</p>
    </div>
  </Loading>
}

export default (props) => {
  return <MeContext.Consumer>
    {({me, update})  => <Edit {...props} update={update} me={me} />}
  </MeContext.Consumer>
}