import React from 'react';
import styles from './AdminCheckoutDetailWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AdminCheckoutDetailWrapper = ({children}) => (
  <div className={cx('detail-wrapper')}>
    {children}
  </div>
);

export default AdminCheckoutDetailWrapper;