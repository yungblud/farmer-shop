import React from 'react';
import styles from './Username.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Username = ({username}) => (
  <div className={cx('wrapper')}>
    @{username}
  </div>
);

export default Username;