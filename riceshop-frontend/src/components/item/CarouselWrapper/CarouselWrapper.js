import React from 'react';
import styles from './CarouselWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CarouselWrapper = ({children}) => (
  <div className={cx('Wrapper')}>
    {children}
  </div>
);

export default CarouselWrapper;