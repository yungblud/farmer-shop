import React from 'react';
import styles from './SendingMail.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SendingMail = () => (
  <div className={cx('Wrapper')}>
    <div className={cx('Content')}>
      메일을 전송중입니다...
    </div>
  </div>
);

export default SendingMail;