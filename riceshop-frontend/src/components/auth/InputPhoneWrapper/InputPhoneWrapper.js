import React from 'react';
import styles from './InputPhoneWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const InputPhoneWrapper = ({label, children}) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('label')}>
        {label}
      </div>
      <div className={cx('phone-input-wrapper')}>
        {children}
      </div>
    </div>
  )
}

export default InputPhoneWrapper;