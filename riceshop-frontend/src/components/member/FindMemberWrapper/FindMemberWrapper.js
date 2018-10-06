import React from 'react';
import styles from './FindMemberWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const FindMemberWrapper = ({children, error, errorMessage}) => (
  <div className={cx('Wrapper')}>
    <div className={cx('ErrorMessage')}>
      {errorMessage}
    </div>
    {children}
  </div>
);

export default FindMemberWrapper;