import React, { Component } from 'react';
import styles from './AuthWrapper.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

class AuthWrapper extends Component {
  
  render() {
    const { children } = this.props;
    return (
      <div className={cx('positioner')}>
        <div className={cx('shadowed-box')}>
          {/* <div className={cx('logo-wrapper')}>
            <Link className={cx('logo')} to="/">
              Logo
            </Link>
          </div> */}
          <div className={cx('contents')}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default AuthWrapper;