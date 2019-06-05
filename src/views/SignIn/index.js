import React from 'react';
import styles from './index.module.scss';

export default class SignIn extends React.PureComponent {
  render() {
    const { history } = this.props;
    return (
      <div className={styles.login}>
        <img className={styles.top_img} src={require('../../asstes/images/login_top.png')} alt="" />
        <div className={styles.login_box}>
          <div className={styles.title}>
            <h1>E+</h1>
            <h2>登陆你的账号</h2>
          </div>
          <div className={styles.login_form}>
            <div className={styles.input_style}>
              <input type="text" placeholder="请输入账号" />
            </div>
            <div className={styles.input_style}>
              <input type="password" placeholder="请输入密码" />
            </div>
            <button type="button">
              <img src={require('../../asstes/icons/submit.png')} alt="" />
            </button>
          </div>
        </div>
        <div className={styles.footer}>
          还没有账号? <span onClick={() => history.push('signup')}>去注册</span>
        </div>
      </div>
    );
  }
}
