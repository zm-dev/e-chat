import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '@/common/history';
import 'normalize.css';

const App = () => <Router history={history}>
  <Switch>
    {/* 首页 */}
    <Route path="/signin" component={require('./views/SignIn').default} />
    <Route path="/signup" component={require('./views/SignUp').default} />
    <Route path="/main" component={require('./views/main').default} />
    <Redirect to="/main" />
  </Switch>
</Router>

ReactDOM.render(<App />, document.getElementById('root'));
