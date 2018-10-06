import React, { Component } from "react";
import styles from "./InputWithLabel.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class InputWithLabel extends Component {
  render() {
    const { label, version, onClick, ...rest } = this.props;
    return (
      <div className={cx("wrapper")}>
        <div className={cx("label")}>
          <div className={cx("Text")}>{label}</div>
          {version === "address" && (
            <div className={cx("Button")}>
              <div className={cx("Icon")} onClick={onClick}>주소 변경</div>
            </div>
          )}
        </div>
        <input className={cx("input")} {...rest} />
      </div>
    );
  }
}

export default InputWithLabel;
