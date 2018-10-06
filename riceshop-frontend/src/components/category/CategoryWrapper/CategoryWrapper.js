import React from 'react';
import styles from './CategoryWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CategoryWrapper = ({children, category}) => (
  <div className={cx('Wrapper')}>
    <div className={cx("Title")}>
      {category}
    </div>
    {children}
  </div>
);

export default CategoryWrapper;