import React from 'react';
import styles from './UserMenuItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UserMenuItem = ({onClick, children}) => (
  <div className={cx('menu-item')} onClick={onClick}>
    {children}
  </div>
);

export default UserMenuItem;