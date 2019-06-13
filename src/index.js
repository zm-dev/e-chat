import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '@/common/history';
import 'normalize.css';
import commonApis from '@/serverApis/common';
import listApis from '@/serverApis/list';
import styles from './index.module.scss';

export const MeContext = React.createContext({
  me: {},
  update: () => {}
});

export const RecordContext = React.createContext({
  record: {},
  update: () => {}
})

export const TeacherContext = React.createContext({
  teachers: []
})

const App = () => {
  const [me, setMe] = React.useState({});
  const [record, setRecord] = React.useState({});
  const [teacherMap, setTeacherMap] = React.useState({
    '校友': [],
    '朋辈辅导员': [],
    '老师': []
  });

  const getRecordListFunc = async (id, params) => {
    const {data: record} = await listApis.getRecordList({
      user_id_b: id,
      ...params
    });
    setRecord(record);
  }

  React.useEffect(() => {
    (async () => {
      const {data} = await commonApis.getMe();
      const {data: teacher} = await listApis.getTeacherList();
      const teachers = {};
      teacher.forEach(list => {
        if (!teachers[list.group]) { 
          teachers[list.group] = [];
        }
        teachers[list.group].push(list);
      });

      setTeacherMap(teachers);
      setMe(data);
    })();
  }, [])
  
  return <MeContext.Provider value={{me, update: (data) => setMe({...data, gender: data.gender === 0 ? '男' : data.gender === 1 ? '女' : '保密'})}}>
    <RecordContext.Provider value={{record, update: (params) => getRecordListFunc(params)}}>
      <TeacherContext.Provider value={teacherMap} >
        <div className={styles.home_wrapper}>
          <div className={styles.center}>
            <Router history={history}>
              <Switch>
                {/* 首页 */}
                <Route path="/chat/:id" component={require('./views/Chat').default} />
                <Route path="/signin" component={require('./views/SignIn').default} />
                <Route path="/signup" component={require('./views/SignUp').default} />
                <Route path="/home" component={require('./views/Home').default} />
                <Redirect to="/home" />
              </Switch>
            </Router>
          </div>
        </div>
      </TeacherContext.Provider>
    </RecordContext.Provider>
  </MeContext.Provider>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
