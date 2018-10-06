import React from "react";
import styles from "./ItemWrapper.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const ItemWrapper = ({ children, title, keyname }) => (
  <div className={cx("item-wrapper")}>
    <div className={cx("top-line")}>
      <div className={cx("title")}>{title}</div>
      <div className={cx("more")}>
        {keyname ? (
          <Link to={`/item/${keyname}`}>
            더 보기
            <svg
              fill="currentColor"
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              viewBox="0 0 40 40"
              style={{
                verticalAlign: "middle"
              }}
            >
              <g>
                <path d="m16.6 10l10 10-10 10-2.3-2.3 7.7-7.7-7.7-7.7z" />
              </g>
            </svg>
          </Link>
        ) : (
          <Link to="/item">
            더 보기
            <svg
              fill="currentColor"
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              viewBox="0 0 40 40"
              style={{
                verticalAlign: "middle"
              }}
            >
              <g>
                <path d="m16.6 10l10 10-10 10-2.3-2.3 7.7-7.7-7.7-7.7z" />
              </g>
            </svg>
          </Link>
        )}
      </div>
    </div>
    <div className={cx("separator")}>
      <div className={cx("segment")} />
    </div>
    {children}
  </div>
);

export default ItemWrapper;
