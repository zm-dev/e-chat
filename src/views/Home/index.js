import React from 'react';

import styles from './index.module.scss';

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className={styles.home}>
        <div>home</div>
      </div>
    );
  }
}
