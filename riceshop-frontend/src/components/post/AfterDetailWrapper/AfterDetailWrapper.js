import React from 'react';
import styles from './AfterDetailWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AfterDetailWrapper = ({children}) => (
  <div className={cx('after-detail-wrapper')}>
    {children}
  </div>
);

export default AfterDetailWrapper;