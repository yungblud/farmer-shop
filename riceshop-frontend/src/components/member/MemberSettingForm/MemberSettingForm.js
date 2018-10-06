import React from 'react';
import styles from './MemberSettingForm.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MemberSettingForm = ({info, onPasswordChangeModalClick, onEmailChangeModalClick}) => (
  <div className={cx('form')}>
    <div className={cx('form-contents')}>
      <div className={cx('row')}>
        <div className={cx('name')}>
          아이디
        </div>
        <div className={cx('row-content')}>
          {info.userID}
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('name')}>
          성함
        </div>
        <div className={cx('row-content')}>
          {info.userName}
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('name')}>
          이메일
        </div>
        <div className={cx('row-content')}>
          <div className={cx('email-block')}>
            {info.userEmail}
          </div>
          <div className={cx('button-wrapper')}>
          </div>
          <div className={cx('button-wrapper')}>
            <div className={cx('button')} onClick={onEmailChangeModalClick}>
              이메일 변경
            </div>
          </div>
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('name')}>
          비밀번호
        </div>
        <div className={cx('row-content')}>
          <div className={cx('lined-text')} onClick={onPasswordChangeModalClick}>
            비밀번호 설정
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MemberSettingForm;