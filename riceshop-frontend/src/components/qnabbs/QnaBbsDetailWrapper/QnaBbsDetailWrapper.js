import React from 'react';
import styles from './QnaBbsDetailWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const QnaBbsDetailWrapper = ({children}) => (
  <div className={cx('wrapper')}>
    <div className={cx('description')}>
      질문 게시판
    </div>
    {children}
  </div>
);

export default QnaBbsDetailWrapper;