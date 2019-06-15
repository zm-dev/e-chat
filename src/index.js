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
          <Route path="/chat/:id" component={require('./views/Chat').default} />
          <Route path="/signin" component={require('./views/SignIn').default} />
          <Route path="/signup" component={require('./views/SignUp').default} />
          <Route path="/home" component={require('./views/Home').default} />
          <Redirect to="/home" />
        </Switch>
      </Router>
    </div>
  </div>,
  document.getElementById('root')
);
