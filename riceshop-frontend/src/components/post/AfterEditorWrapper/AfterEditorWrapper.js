import React from 'react';
import styles from './AfterEditorWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AfterEditorWrapper = ({children, title}) => (
  <div className={cx('wrapper')}>
    <div className={cx('description')}>
      {title}에 대한 후기 남기기
    </div>
    {children}
  </div>
);

export default AfterEditorWrapper;