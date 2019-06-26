import React from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { MeContext, MessageContext } from '../main';
import Avatar from '@/components/Avatar';
import styles from './index.module.scss';

const tab_bottom = [
  {
    icon: 'icon-pinglun',
    title: '消息',
    link: `/chat_list`,
    hasBadge: true,
    hasHeader: true,
    hasFooter: true,
  },
  {
    icon: 'icon-tongxunlu1',
    title: '联系列表',
    link: `/contact_list`,
    hasBadge: false,
    hasHeader: true,
    hasFooter: true,
  },
  {
    icon: 'icon-tongxunlu1',
    title: '我',
    link: `/me`,
    hasHeader: false,
    hasFooter: false,
  },
  {
    icon: 'icon-tongxunlu1',
    title: '修改资料',
    link: `/edit_me`,
    hasHeader: true,
    hasReturn: true,
    hasFooter: false,
  },
];

export default class Home extends React.PureComponent {
  state = {
    active: 0,
  };

  testRoute(pathname) {
    return tab_bottom.findIndex(tab => pathname.includes(tab.link));
  }

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props;

    const active = this.testRoute(pathname);
    this.setState({ active });
  }

  componentWillReceiveProps(nextProps) {
    const {
      location: { pathname },
    } = nextProps;
    const active = this.testRoute(pathname);
    this.setState({ active });
  }

  render() {
    const { match, history } = this.props;
    const { active } = this.state;
    return (
      <div className={styles.home}>
        {tab_bottom[active].hasHeader && (
          <div className={styles.header}>
            {tab_bottom[active].hasReturn ? (
              <i onClick={() => history.goBack()} className="iconfont icon-jiantou" />
            ) : (
              <MeContext.Consumer>
                {({ me }) => (
                  <div onClick={() => history.push('/main/home/me')} style={{ width: 25, height: 25 }}>
                    <Avatar textSize={13} src={me.avatar_url} title={me.nick_name} alt="" />
                  </div>
                )}
              </MeContext.Consumer>
            )}
            <span className={styles.title}>{tab_bottom[active]['title']}</span>
          </div>
        )}
        <div
          style={{
            paddingTop: tab_bottom[active].hasHeader && '50px',
            paddingBottom: tab_bottom[active].hasFooter && '50px',
          }}
          className={styles.content}
        >
          <Switch>
            <Route path={`${match.url}/chat_list`} component={require('../List').default} />
            <Route path={`${match.url}/contact_list`} component={require('../Contact').default} />
            <Route path={`${match.url}/me/:id?`} component={require('../Me').default} />
            <Route path={`${match.url}/edit_me`} component={require('../Me/edit').default} />
            <Redirect to={`${match.url}/chat_list`} />
          </Switch>
        </div>
        {tab_bottom[active].hasFooter && (
          <div className={styles.footer}>
            {tab_bottom.map((tab, index) => {
              return tab.hasFooter ? (
                <NavLink
                  onClick={() => this.setState({ active: index })}
                  key={index}
                  to={`${match.url}${tab.link}`}
                  className={styles.tabbar_item}
                  activeClassName={styles.active}
                >
                  <i className={['iconfont', tab.icon].join(' ')}>
                  {tab.hasBadge && <MessageContext.Consumer>
                    {({yetReadCount}) =>
                      {
                        return yetReadCount > 0 && <span style={{
                            padding: '1px 5px',
                            position: 'absolute',
                            background: 'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)',
                            color: '#FFF',
                            borderRadius: 10,
                            fontSize: 10
                          }}>
                            {yetReadCount <= 99 ? yetReadCount : '99+'}
                          </span>
                      }}
                    </MessageContext.Consumer>}
                  </i>
                  <p>{tab.title}</p>
                </NavLink>
              ) : null;
            })}
          </div>
        )}
      </div>
    );
  }
}
