import * as React from 'react';
import ContactTab from '@/components/ContactTab';
import ContactCard from '@/components/ContactCard';
import styles from './index.module.scss';
import {TeacherContext} from '@/index';
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
        {teacherMap =>
          <div className={styles.contact_content}>
            {teacherMap[active] && teacherMap[active].map((item, index) => <ContactCard onClick={() => history.push(`/chat/${item.id}`)} index={index} color_map={color_map} key={index} data={item} />)}
          </div>
        }
        
      </TeacherContext.Consumer>
    </div>
  );
}