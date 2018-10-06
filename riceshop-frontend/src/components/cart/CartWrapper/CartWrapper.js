import React from 'react';
import styles from './CartWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CartWrapper = ({children}) => (
  <div className={cx('positioner')}>
        <div className={cx('shadowed-box')}>
          <div className={cx('logo-wrapper')}>
            <div className={cx('logo')}>
              장바구니
            </div>
          </div>
          <div className={cx('contents')}>
            {children}
          </div>
        </div>
      </div>
);

export default CartWrapper;