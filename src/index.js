import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '@/common/history';
import 'normalize.css';
import styles from './index.module.scss';

ReactDOM.render(
  <div className={styles.home_wrapper}>
    <div className={styles.center}>
      <Router history={history}>
        <Switch>
          {/* 首页 */}
          <Route path="/home" component={require('./views/Home').default} />
          <Route path="/" component={require('./views/Home').default} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  </div>,
  document.getElementById('root')
);
