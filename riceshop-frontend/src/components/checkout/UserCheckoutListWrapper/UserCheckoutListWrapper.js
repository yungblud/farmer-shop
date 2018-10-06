import React from 'react';
import styles from './UserCheckoutListWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UserCheckoutListWrapper = ({children}) => (
  <div className={cx('wrapper')}>
    {children}
  </div>
);

export default UserCheckoutListWrapper;