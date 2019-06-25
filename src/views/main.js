import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '@/common/history';
import 'normalize.css';
import styles from '../index.module.scss';
import commonApis from '@/serverApis/common';
import chatApi from '@/serverApis/chat';
import listApis from '@/serverApis/list';

export const MeContext = React.createContext({
  me: {},
  loading: false,
  update: () => {},
});

export const RecordContext = React.createContext({
  record: {},
  update: () => {},
  create: () => {},
  setRead: () => {}
});

export const TeacherContext = React.createContext({
  teachers: [],
  teacherLoading: false
});

export const MessageContext = React.createContext({
  messages: {},
  loading: false
})

export default class Main extends React.PureComponent {

  state = {
    me: {},
    meLoading: false,
    record: {},
    ws: {},
    messageMap: {},
    messageLoading: false,
    teacherMap: {
      校友: {},
      朋辈辅导员: {},
      老师: {},
    },
    teacherLoading: false
  }

  getMessageListFunc = async () => {
    this.setState({messageLoading: true});
    try {
      const {data} = await listApis.messageList();
      const tempMap = {};
      data.forEach(item => {
        tempMap[item.user_id] = item;
      })
      this.setState({messageMap: tempMap, messageLoading: false});
    } catch (e) {
      this.setState({messageLoading: false});
    }
  }

  getRecordListFunc = async (params) => {
    const {record} = this.state;
    const { data } = await listApis.getRecordList(params);
    
    let newRecords = record.records || [];
    let reverseRecords = data.records.reverse();
    
    if (params.page !== 1) {
      newRecords.unshift(...reverseRecords);
    } else {
      newRecords = reverseRecords;
    }
    
    this.setState({record: {...data, records: newRecords}});
  };

  getTeacherListFunc = async () => {
    this.setState({teacherLoading: true});
    try {
      const { data: teacher } = await listApis.getTeacherList();
      const teachers = {};
      teacher.forEach(list => {
        if (!teachers[list.group]) {
          teachers[list.group] = {};
        }
        teachers[list.group][list.id] = list;
      });
      this.setState({teacherMap: teachers, teacherLoading: false});
    } catch (e) {
      this.setState({teacherLoading: false});
    }
  }

  async getMe () {
    try{ 
      this.setState({meLoading: true});
      const { data } = await commonApis.getMe();
      this.setState({me: data, meLoading: false});
    } catch (e) {
      this.setState({meLoading: false});
    }
  }

  // 设置消息状态
  setMsgStatus = async (from_user_id) => {
    await chatApi.setMsgRead(from_user_id);
    this.getMessageListFunc();
  }

  async componentWillMount () {
    await this.getTeacherListFunc();
    await this.getMessageListFunc();
    await this.getMe();
    const ws = new WebSocket(`ws://${window.location.host}/api/v1/ws_conn`);
    this.setState({ws});
    ws.onmessage = async e => {
      const {messageMap, record, me} = this.state;
      const receiveData = JSON.parse(e.data);
      const msgType = receiveData.send_user_id;
      if (msgType === -1) {
        this.getTeacherListFunc();
      } else {
        const newMsg = {
          ...messageMap[msgType],
          last_message: receiveData['data'],
          last_message_send_time: receiveData['send_at'],
          not_read_msg_count: messageMap[msgType] ? messageMap[msgType]['not_read_msg_count'] + 1 : 1,
        };
        this.setState({messageMap: {...messageMap, [msgType]: newMsg}});
        const newRecords = record.records || [];
        const now = new Date();
        newRecords.push({
          created_at: now,
          from_id: receiveData.send_user_id,
          id: record.records ? record.records.length + 1 : 0,
          is_read: true,
          msg: receiveData.data,
          to_id: me.id,
          updated_at: now
        });
        this.setState({record: {...record, records: newRecords}});
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
        document.body.scrollTop = document.body.scrollHeight;
      }
    }
  }

  render () {
    const {record, messageMap, messageLoading, teacherMap, teacherLoading, me, meLoading, ws} = this.state;
    const {match} = this.props;
    return (
      <MeContext.Provider
        value={{
          me,
          meLoading,
          update: data =>
            this.setState({me: { ...data, gender: data.gender === 0 ? '男' : data.gender === 1 ? '女' : '保密' }}),
        }}
      >
        <RecordContext.Provider
          value={{
            record, 
            create: params => this.getRecordListFunc(params),
            update: async data => {
              const tempRecord = {...record};
                tempRecord.records.push(data);
                this.setState({record: tempRecord});
                const jsonData = JSON.stringify({
                  msg: data.msg,
                  to_user_id: data.to_id
                });
                await ws.send(jsonData);
                document.documentElement.scrollTop = document.documentElement.scrollHeight;
                document.body.scrollTop = document.body.scrollHeight;
              },
              
              setRead: (from_user_id) => this.setMsgStatus(from_user_id)
        }}>
          <TeacherContext.Provider value={{teacherMap, teacherLoading}}>
            <MessageContext.Provider value={{messageMap, messageLoading}}>
              <div className={styles.home_wrapper}>
                <div className={styles.center}>
                  <Router history={history}>
                    <Switch>
                      {/* 首页 */}
                      <Route path={`${match.url}/chat/:id`} component={require('../views/Chat').default} />
                      <Route path={`${match.url}/home`} component={require('../views/Home').default} />
                      <Redirect to={`${match.url}/home`}/>
                    </Switch>
                  </Router>
                </div>
              </div>
            </MessageContext.Provider>
          </TeacherContext.Provider>
        </RecordContext.Provider>
      </MeContext.Provider>
    );
  }
};