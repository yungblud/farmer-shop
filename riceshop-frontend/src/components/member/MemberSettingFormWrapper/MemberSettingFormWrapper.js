import React from 'react';
import styles from './MemberSettingFormWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MemberSettingFormWrapper = ({children}) => (
  <div className={cx('wrapper')}>
    <div className={cx('description')}>
      계정 설정
    </div>
    {children}
  </div>
);

export default MemberSettingFormWrapper;