import * as React from 'react';
import ContactTab from '@/components/ContactTab';
import ContactCard from '@/components/ContactCard';
import styles from './index.module.scss';

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
  const [teachList] = React.useState([
    {
      avatar_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3913721637,490556209&fm=27&gp=0.jpg',
      nike_name: '教师1',
      profile: '教师简介',
      group: '校友',
      company: '计算机学院',
      gender: true
    },
    {
      avatar_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3913721637,490556209&fm=27&gp=0.jpg',
      nike_name: '教师2',
      profile: '教师简介',
      group: '老师',
      company: '计算机学院',
      gender: false
    },
    {
      avatar_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3913721637,490556209&fm=27&gp=0.jpg',
      nike_name: '教师3',
      profile: '教师简介',
      group: '朋辈辅导员',
      company: '计算机学院',
      gender: false
    },
    {
      avatar_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3913721637,490556209&fm=27&gp=0.jpg',
      nike_name: '教师4',
      profile: '教师简介',
      group: '老师',
      company: '计算机学院',
      gender: false
    },
    {
      avatar_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3913721637,490556209&fm=27&gp=0.jpg',
      nike_name: '教师1',
      profile: '教师简介',
      group: '校友',
      company: '计算机学院',
      gender: true
    },
  ]);

  return (
    <div className={styles.contact}>
      <ContactTab color_map={color_map} />
      <div className={styles.contact_content}>
        {teachList.map((item, index) => <ContactCard onClick={() => history.push('/chat')} index={index} color_map={color_map} key={index} data={item} />)}
      </div>
    </div>
  );
}