import React from 'react';
import styles from './PaymentList.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PaymentList = ({title, children}) => (
  <div>
    <div className={cx('title')}>
      {title}
    </div>
    {children}
  </div>
);

export default PaymentList;