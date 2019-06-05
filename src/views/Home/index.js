import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './index.module.scss';

export default class Home extends React.PureComponent {
  render() {
    const { match } = this.props;
    return (
      <div className={styles.home}>
        <div className={styles.header}>
          <img src="http://p2.pstatp.com/large/1253/8577488335" alt="" />
          <span className={styles.title}>消息</span>
        </div>
        <div className={styles.content}>
          <Switch>
            <Route path={`${match.url}/chat_list`} component={require('../List').default} />
            <Redirect to={`${match.url}/chat_list`} />
          </Switch>
        </div>
        <div className={styles.footer}>
          <div className={[styles.tabbar_item, styles.active].join(' ')}>
            <i className="iconfont icon-pinglun" />
            <p>消息</p>
          </div>
          <div className={styles.tabbar_item}>
            <i className="iconfont icon-zhuanshenren" />
            <p>联系列表</p>
          </div>
        </div>
      </div>
    );
  }
}
