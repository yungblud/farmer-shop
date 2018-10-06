import React from 'react';
import styles from './CheckoutList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const CheckoutList = ({checkoutList}) => {
  const checkout = checkoutList.map((list, i) => {
    return (
      
      // <div className={cx('line')} key={i}>
      <Link to={`/admin/list/${list.get('id')}`} className={cx('line')} key={i}>
        <div className={cx('number')}>
          {list.get('id')}
        </div>
        <div className={cx('title')}>
          {list.get('ordered_list')}
        </div>
        <div className={cx('amount')}>
          {list.get('paid_amount')}
        </div>
        <div className={cx('username')}>
          최동호
        </div>
        </Link>
      // </div>
      
    )
  })
  return (
    <div className={cx('checkout-list')}>
      <div className={cx('checkout-form')}>
        <div className={cx('thead')}>
          <div className={cx('number')}>
            번호
          </div>
          <div className={cx('title')}>
            주문 리스트
          </div>
          <div className={cx('amount')}>
            총 지불 가격
          </div>
          <div className={cx('username')}>
            주문자 이름
          </div>
        </div>
        {checkout}
      </div>
    </div>
  );
}

export default CheckoutList;