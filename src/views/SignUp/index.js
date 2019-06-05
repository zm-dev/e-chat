import React from 'react';
import styles from './index.module.scss';

export default class SignUp extends React.PureComponent {
  render() {
    const { history } = this.props;
    return (
      <div className={styles.signup}>
        <img
          className={styles.top_img}
          src={require('../../asstes/images/signup_top1.png')}
          alt=""
        />
        <img
          className={styles.left_img}
          src={require('../../asstes/images/signup_left.png')}
          alt=""
        />
        <img
          onClick={() => history.goBack()}
          className={styles.return}
          src={require('../../asstes/icons/left_arrow.png')}
          alt=""
        />
        <div className={styles.signup_box}>
          <h2 className={styles.title}>注册一个账号</h2>
          <div className={styles.signup_form}>
            <div className={styles.input_style}>
              <input type="text" placeholder="请输入姓名" />
            </div>
            <div className={styles.input_style}>
              <input type="text" placeholder="请输入账号" />
            </div>
            <div className={styles.input_style}>
              <input type="password" placeholder="请输入密码" />
            </div>
            <div className={styles.input_style}>
              <input type="password" placeholder="再次确定密码" />
            </div>
            <button type="button">
              <img src={require('../../asstes/icons/submit.png')} alt="" />
            </button>
          </div>
        </div>
        <div className={styles.footer}>
          已经有账号了? <span onClick={() => history.push('signin')}>去登录</span>
        </div>
      </div>
    );
  }
}
