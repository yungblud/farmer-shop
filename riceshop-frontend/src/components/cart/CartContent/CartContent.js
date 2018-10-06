import React from 'react';
import styles from './CartContent.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CartContent = ({title, children}) => (
  <div>
    <div className={cx('title')}>
      {title}
    </div>
    {children}
  </div>
);

export default CartContent;