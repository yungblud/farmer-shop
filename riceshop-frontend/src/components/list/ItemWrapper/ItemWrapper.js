import React from 'react';
import styles from './ItemWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ItemWrapper = ({children, title}) => (
  <div className={cx('item-wrapper')}>
  <div className={cx('title')}>
  {title}
  </div>
    {children}
  </div>
);

export default ItemWrapper;