import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import SidebarContainer from 'containers/Sidebar/SidebarContainer';
import { Link } from 'react-router-dom';
import UserMenuContainer from 'containers/Base/UserMenuContainer';
const cx = classNames.bind(styles);

const Header = ({adminLogged, memberLogged, memberLogout, onMenuClick, loggedInfo}) => (
  <div className={cx('header')}>
   
    <div className={cx('header-content')}>
      <Link to="/" className={cx('header-logo')}>
        <div className={cx('text')}>
          모란골 농원
        </div>
      </Link>
      {/* <div className={cx('right-pc')}> */}
        {/* {
          !adminLogged && 
          [<Link to="/item" className={cx('menu')} key="item">
            쇼핑하기
          </Link>,
          <Link to="/cart" className={cx('menu')} key="cart">
            장바구니
          </Link>,
          <Link to="/qna" className={cx('menu')} key="qnabbs">
            질문 게시판
          </Link>]
        } */}
        {/* {
        (!memberLogged && !adminLogged) && 
        <Link to="/login" className={cx('menu')}>
          로그인/회원가입
        </Link>
        } */}
      {/* {
      memberLogged ? 
      adminLogged ? null : [
        <Link to="" onClick={memberLogout} className={cx('menu')} key="logout">
        로그아웃
        </Link>,
        <div onClick={onMenuClick} className={cx('menu')} key="my-info">
          내 정보
        </div>
      ] : 
      null
    } */}
    {/* {
      adminLogged && [
        <Link to="/admin/main" className={cx('menu')} key="adminmain">관리자페이지로</Link>,
        <Link to="/item" className={cx('menu')} key="item">
            쇼핑하기
          </Link>,
          <Link to="/cart" className={cx('menu')} key="cart">
            장바구니
          </Link>,
          <Link to="/qna" className={cx('menu')} key="qnabbs">
            질문 게시판
          </Link>
        
      ]
    } */}
      
      {/* </div> */}
      
      <div className={cx('right-mobile')}>
        {/* {
          logged ? <UserThumbnail/> : <Button>Menu</Button>
        } */}
        <SidebarContainer adminLogged={adminLogged} memberLogged={memberLogged}/>
        
      </div>
    </div>
    <UserMenuContainer/>
  </div>
);

export default Header;