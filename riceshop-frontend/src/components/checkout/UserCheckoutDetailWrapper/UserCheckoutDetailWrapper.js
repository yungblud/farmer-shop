import React from 'react';
import styles from './UserCheckoutDetailWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UserCheckoutDetailWrapper = ({children}) => (
  <div className={cx('wrapper')}>
    <div className={cx('description')}>
      주문 하신 상품의 상세 정보입니다.
    </div>
    {children}
    
  </div>
);

export default UserCheckoutDetailWrapper;