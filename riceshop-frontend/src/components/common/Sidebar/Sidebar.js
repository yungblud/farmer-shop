import React from "react";
import styles from "./Sidebar.scss";
import classNames from "classnames/bind";
import SideBarWrapper from "components/common/SideBarWrapper";
import { Link } from "react-router-dom";
import Button from "components/common/Button";
const cx = classNames.bind(styles);

const MenuItem = ({ to, children, onClick }) => {
  return (
    <Link onClick={onClick} className={cx("menu-item")} to={to}>
      {children}
    </Link>
  );
};

const ClickableMenuItem = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={cx("menu-item")}>
      {children}
    </div>
  );
};

const Sidebar = ({
  visible,
  onClose,
  adminLogged,
  adminLogout,
  memberLogged,
  memberLogout,
  goToCartPage,
  categories
}) => {
  const categoryList =
    categories.toJS().length > 0 &&
    categories.toJS().map((category, i) => {
      return (
        <MenuItem
          to={`/item/${category.keyname}`}
          onClick={onClose}
          key={category.keyname}
        >
          {category.title}
        </MenuItem>
      );
    });
  return (
    <SideBarWrapper visible={visible}>
      <div className={cx("top-menu")}>
        <div className={cx("description")}>즐거운 쇼핑 되세요 :)</div>
      </div>
      <div className={cx("menu")}>
        {/* {
        (memberLogged) ? [<ClickableMenuItem onClick={memberLogout} key="adminLogout">로그아웃</ClickableMenuItem>,
        <MenuItem to="/checkout" onClick={onClose} key="checkout">주문정보</MenuItem>,] 
        : !adminLogged &&
        [<MenuItem to="/login" onClick={onClose} key="login">로그인</MenuItem>,
        <MenuItem to="/register" onClick={onClose} key="register">회원가입</MenuItem>]
      }
      {
        adminLogged && [
          <MenuItem to="/admin/main" onClick={onClose} key="main">관리자 페이지로</MenuItem>,
          <MenuItem to="/editor" onClick={onClose} key="editor">상품 작성하기</MenuItem>,
          <MenuItem to="/admin/list" onClick={onClose} key="list">주문 리스트 확인</MenuItem>,
          <ClickableMenuItem onClick={adminLogout} key="adminLogout">관리자 로그아웃</ClickableMenuItem>
        ]
      } */}
        {!memberLogged &&
          !adminLogged && (
            <MenuItem to="/login" onClick={onClose}>
              로그인/회원가입
            </MenuItem>
          )}
          {memberLogged
          ? adminLogged
            ? null
            : [
                <ClickableMenuItem onClick={memberLogout} key="logout">
                  로그아웃
                </ClickableMenuItem>,
                <MenuItem to="/member" onClick={onClose} key="my-info">
                  내 정보
                </MenuItem>,
                <MenuItem to="/checkout" onClick={onClose} key="checkout-info">
                  주문 정보
                </MenuItem>
              ]
          : null}
        {!adminLogged && [
          <MenuItem to="/item" onClick={onClose} key="item">
            신상품
          </MenuItem>,
          <MenuItem to="/cart" onClick={onClose} key="cart">
            장바구니
          </MenuItem>,
          <MenuItem to="/qna" onClick={onClose} key="qnabbs">
            질문 게시판
          </MenuItem>
        ]}

        {!adminLogged && categories.toJS().length > 0 && categoryList}

        
        {adminLogged && [
          <MenuItem to="/admin/main" onClick={onClose} key="adminmain">
            관리자페이지로
          </MenuItem>,
          <MenuItem to="/item" onClick={onClose} key="item">
            쇼핑하기
          </MenuItem>,
          <MenuItem to="/cart" onClick={onClose} key="cart">
            장바구니
          </MenuItem>,
          <MenuItem to="/qna" onClick={onClose} key="qnabbs">
            질문 게시판
          </MenuItem>
        ]}
      </div>
    </SideBarWrapper>
  );
};

export default Sidebar;
