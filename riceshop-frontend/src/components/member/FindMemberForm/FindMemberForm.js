import React from "react";
import styles from "./FindMemberForm.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FindMemberForm = ({
  userId,
  username,
  userEmail1,
  userEmail2,
  onChangeInput,
  onFindUserId,
  onFindPassword
}) => {
  const handleChange = e => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  };

  return (
    <div className={cx("Form")}>
      <div className={cx("FindId")}>
        <div className={cx("TitleLabel")}>아이디 찾기</div>
        <div className={cx("TitleBorder")} />
        <div className={cx("FindForm")}>
          <div className={cx("Input")}>
            <input
              type="text"
              name="username"
              placeholder="이름"
              value={username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="userEmail1"
              placeholder="가입 이메일 주소"
              value={userEmail1}
              onChange={handleChange}
            />
          </div>
          <div className={cx("Button")} onClick={onFindUserId}>
            아이디 찾기
          </div>
        </div>
      </div>
      <div className={cx("FindPassword")}>
        <div className={cx("TitleLabel")}>비밀번호 찾기</div>
        <div className={cx("TitleBorder")} />
        <div className={cx("FindForm")}>
          <div className={cx("Input")}>
            <input 
              type="text" 
              name="userId" 
              placeholder="아이디"
              value={userId}
              onChange={handleChange} />
            <input 
              type="text" 
              name="userEmail2" 
              placeholder="가입 이메일 주소"
              value={userEmail2}
              onChange={handleChange} />
          </div>
          <div className={cx("Button")} onClick={onFindPassword}>비밀번호 찾기</div>
        </div>
      </div>
    </div>
  );
};

export default FindMemberForm;
