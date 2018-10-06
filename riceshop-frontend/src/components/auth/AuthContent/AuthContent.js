import React from 'react';
import styles from './AuthContent.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const AuthContent = ({title, children, onButtonClick, buttonText, visible, errorMessage, mode}) => {
  return (
    <div>
      <div className={cx('title')}>
        {title}
        
      </div>
      {
        visible && <div className={cx('error')}>
                    {errorMessage}
                   </div>
      }
      {children}
      {
        mode === "login" ?
       ([
        <div className={cx('newbie')} key="newbie">
          처음이신가요? <Link to="/register" className={cx('register')}>회원가입</Link> 하러가기
        </div>,
        <div className={cx('newbie')} key="not-newbie">
          <Link to="/find" className={cx('register')}>아이디 혹은 비밀번호 찾기</Link> 
        </div>
       ]) : mode !== 'payment' &&  (
          <div className={cx('newbie')}>
            이미 회원이신가요? <Link to="/login" className={cx('register')}>로그인</Link> 하러가기
          </div>
        )
      }
      <div className={cx('buttons')}>
        <Button onClick={onButtonClick} theme="login">{buttonText}</Button>
      </div>
    </div>
  );
}

export default AuthContent;