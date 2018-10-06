import React from 'react';
import styles from './InputWithLabelPhone.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const InputWithLabelPhone = ({label, ...rest}) => {
  return (
    <div className={cx('wrapper')}>
      <input className={cx('input')} {...rest}/>
    </div>
  );
}

export default InputWithLabelPhone;