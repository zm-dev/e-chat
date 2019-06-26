import * as React from 'react';
import ContactTab from '@/components/ContactTab';
import ContactCard from '@/components/ContactCard';
import styles from './index.module.scss';
import {TeacherContext, MeContext} from '../main';
import EmptyStatus from '@/components/EmptyStatus';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
export const color_map = {
  '校友': {
    color: '#209cff',
    background: 'rgba(32, 156, 255, 0.2)'
  },
  '朋辈辅导员': {
    color: 'rgb(61, 180, 224)',
    background: 'rgba(61, 180, 224, 0.2)'
  },
  '老师': {
    color: '#00ccb1',
    background: 'rgba(104, 224, 207, 0.3)'
  }
};

export default ({history}) => {
  const [active, setActive] = React.useState('校友');

  return (
    <div className={styles.contact}>
      <ContactTab active={active} onChange={(item) => {
        setActive(item);
      }} color_map={color_map} />
      <TeacherContext.Consumer>
        {({teacherMap, teacherLoading}) =>
          <MeContext.Consumer>
            {({me}) =>
              <Loading loading={teacherLoading} info="正在加载数据">
                {!teacherLoading && teacherMap[active] && Object.keys(teacherMap[active]).length > 0 ? <div className={styles.contact_content}>
                  {Object.keys(teacherMap[active]).map(key =>
                    <ContactCard
                      onClick={() => {
                        if (Number(key) === me.id) {
                          Toast.info('不能和自己聊天😯');
                          return;
                        }
                        history.push(`/main/chat/${key}`);
                      }}
                      index={key}
                      color_map={color_map}
                      key={key}
                      data={teacherMap[active][key]}
                  />)}
                </div> :
              <EmptyStatus info="当前分类下暂无数据" />}
            </Loading>
          }
          </MeContext.Consumer>
        }
      </TeacherContext.Consumer>
    </div>
  );
}