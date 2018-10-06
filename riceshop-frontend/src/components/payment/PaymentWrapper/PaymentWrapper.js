import React from 'react';
import styles from './PaymentWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PaymentWrapper = ({children}) => (
  <div className={cx('positioner')}>
  <div className={cx('shadowed-box')}>
    <div className={cx('logo-wrapper')}>
      <div className={cx('logo')}>
        주문 작성
      </div>
    </div>
    <div className={cx('contents')}>
      {children}
    </div>
  </div>
</div>
);

export default PaymentWrapper;