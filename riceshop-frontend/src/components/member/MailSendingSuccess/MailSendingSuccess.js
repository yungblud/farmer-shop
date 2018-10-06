import React from 'react';
import styles from './MailSendingSuccess.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const MailSendingSuccess = () => (
  <div className={cx('Wrapper')}>
    <div className={cx('Content')}>
      <div className={cx('MailAddress')}>
        asdasd@naver.com
      </div>
      <div className={cx('Description')}>
        위 메일 주소로 메일이 전송되었습니다.
      </div>
      <div className={cx('Button')}>
        <Button to="/login">로그인 페이지로</Button>
      </div>
    </div>
    
  </div>
);

export default MailSendingSuccess;