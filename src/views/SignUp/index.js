import React from 'react';
import commonApi from '@/serverApis/common';
import Toast from '@/components/Toast';
import styles from './index.module.scss';

export default class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      rePassword: '',
      nickname: '',
    };
  }

  submit = () => {
    const { account, password, rePassword, nickname } = this.state;
    const { history } = this.props;
    if (password !== rePassword) {
      Toast.info('两次密码不一致哦！');
    } else if (account === '' || password === '' || rePassword === '' || nickname === '') {
      Toast.info('请输入注册信息！');
    } else {
      commonApi.signUp({ account, password, nickname }).then(() => {
        Toast.info('创建成功！');
        history.push('home');
      });
    }
  };

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
              <input
                type="text"
                onInput={e => {
                  this.setState({
                    nickname: e.target.value,
                  });
                }}
                placeholder="请输入姓名"
              />
            </div>
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
            <div className={styles.input_style}>
              <input
                type="password"
                onInput={e => {
                  this.setState({
                    rePassword: e.target.value,
                  });
                }}
                placeholder="再次确定密码"
              />
            </div>
            <button onClick={this.submit} type="button">
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
