import React from 'react';
import commonApi from '@/serverApis/common';
import Toast from '@/components/Toast';
import styles from './index.module.scss';

export default class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
    };
  }

  submit = () => {
    const { account, password } = this.state;
    const { history } = this.props;
    if (account === '' || password === '') {
      Toast.info('请输入账号或密码！');
    } else {
      commonApi
        .signIn({ account, password })
        .then(() => {
          Toast.info('登录成功！');
          history.push('home');
        })
        .catch(error => {
          Toast.info(error.response.data.message);
        });
    }
  };

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
              <input
                type="text"
                onInput={e => {
                  this.setState({
                    account: e.target.value,
                  });
                }}
                placeholder="请输入账号"
              />
            </div>
            <div className={styles.input_style}>
              <input
                type="password"
                onInput={e => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
                placeholder="请输入密码"
              />
            </div>
            <button onClick={this.submit} type="button">
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
