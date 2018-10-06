import React from "react";
import styles from "./MenuBar.scss";
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const MenuBar = ({ categories }) => {
  const categoryList = categories.toJS().length > 0 && categories.toJS().map((category, i) => {
    return (
      <Link to={`/item/${category.keyname}`} className={cx("Menu")} key={category.keyname}>
        <div className={cx('Text')}>
        {category.title}
        </div>
      </Link>
    );
  });

  return (
    <div className={cx("MenuBar")}>
      <div className={cx("Line")}>{categoryList}</div>
    </div>
  );
};

export default MenuBar;
