import React from 'react';
import styles from './AuthBar.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import TiShoppingCart from 'react-icons/lib/ti/shopping-cart';  

const cx = classNames.bind(styles);

const AuthBar = ({adminLogged, memberLogged, memberLogout, onMenuClick, loggedInfo}) => (
  <div className={cx('AuthBar')}>
    <div className={cx('Line')}>
      <div className={cx('Right')}>
        {(!memberLogged && !adminLogged) && (
        [<Link to="/login" className={cx('Menu')} key="login">
          로그인
        </Link>,
        <Link to="/register" className={cx('Menu')} key="register">
          회원가입
        </Link>]
      )}
      {
        memberLogged ? 
        adminLogged ? null : [
          <Link to="/member" className={cx('Menu')} key="mypage">
            마이 페이지
          </Link>,
          <Link to="/checkout" className={cx('Menu')} key="orders">
          주문 조회
          </Link>,
          <div onClick={memberLogout} className={cx('Menu')} key="logout">
          로그아웃
          </div>
        ] : 
        null
      }
      {
        adminLogged && (
          <Link to="/admin/list" className={cx('Menu')}>
            관리자 페이지
          </Link>
        )
      }
        <Link to="/cart" className={cx('Menu')}>
          장바구니 <TiShoppingCart className={cx('Icon')} />
        </Link>
        <Link to="/qna" className={cx('Menu')}>
          고객 센터
        </Link>
      </div>
    </div>
  </div>
);

export default AuthBar;