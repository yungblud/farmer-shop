import React from 'react';
import styles from './AdminHeader.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const AdminHeader = ({onAdminLogout}) => (
  <div className={cx('admin-header')}>
    <div className={cx('header-contents')}>
      <div className={cx('logo')}>
        <Link to="/admin/list">관리자 페이지</Link>
      </div>
      <div className={cx('right-pc')}>
        <div className={cx('right-menu')}>
          <Link to="/" className={cx('menu-item')}>
            쇼핑몰로 이동
          </Link>
          <div className={cx('menu-item')} onClick={onAdminLogout}>
            관리자 로그아웃
          </div>
        </div>
      </div>
    </div>
    <div className={cx('menu-pc')}>
        <Link to="/editor" className={cx('menu-item')}>
          상품 작성하기
        </Link>
        <Link to="/admin/list" className={cx('menu-item')}>
          결제 리스트 보기
        </Link>
        <Link to="/admin/category" className={cx('menu-item')}>
          카테고리 추가 / 변경
        </Link>
      </div>
  </div>
);

export default AdminHeader;