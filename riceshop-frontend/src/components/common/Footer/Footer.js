import React from "react";
import styles from "./Footer.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const Footer = () => (
  <div className={cx("footer")}>
    <div className={cx("footer-content")}>
      <div className={cx("TopLine")}>
        <div className={cx("Item")}>
          <div className={cx("Title")}>Customer Center / 고객 센터</div>
          <div className={cx("Bold")}>010-1234-1234</div>
          <div className={cx("Normal")}>
            개인이 운영하는 쇼핑몰입니다. <br />
            전화를 못받을시 문자를 남겨주시면 <br />
            감사하겠습니다.
          </div>
        </div>
        <div className={cx("Item")}>
          <div className={cx("Title")}>Bank Info / 은행 정보</div>
          <div className={cx("BankAccount")}>KB 국민 000-000-00-000000</div>
          <div className={cx("Normal")}>예금주: 박동재</div>
        </div>
      </div>
      <div className={cx('BottomLine')}>
        <div className={cx('Line')}>
          상호명 : 모란골 농원 주소 : 경북 예천군 예천시 모란골 대표 : 박동재 개인정보관리자 : 박동재 사업자등록번호 : 000-00-00000 [사업자정보확인]
        </div>
        <div className={cx('Line')}>
          통신판매업신고번호 : 제 2017 강남 00000호 메일 : killi8n@gmail.com 호스팅제공 : killi8n
        </div>
        <div className={cx('Line')}>
          Copyright (c) killi8n All Rights Reserved.
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
