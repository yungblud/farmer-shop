import React from "react";
import styles from "./CategoryEdit.scss";
import classNames from "classnames/bind";
import Button from "components/common/Button";

const cx = classNames.bind(styles);

const CategoryEdit = ({ categories, showModal, onCreate, onUpdate, onSetId, onRemove }) => {

  const handleCreate = () => {
    onCreate();
    showModal();
  }

  const handleUpdate = (e) => {
    onUpdate();
    showModal();
    onSetId({id: e.target.id});
  }

  const handleRemove = (e) => {
    onRemove({id: e.target.id});
  }

  const categoryList =
    categories.toJS().length > 0 &&
    categories.toJS().map((category, i) => {
      return (
        <div className={cx("Line")} key={category.id}>
          <div className={cx("Col")}>{category.id}</div>
          <div className={cx("Col")}>{category.title}</div>
          <div className={cx("Col")}>{category.keyname}</div>
          <div className={cx("Col")}>
            <Button id={category.id} onClick={handleUpdate}>수정</Button>
          </div>
          <div className={cx("Col")}>
            <Button id={category.id} onClick={handleRemove}>삭제</Button>
          </div>
        </div>
      );
    });
  return (
    <div className={cx("Wrapper")}>
      <div className={cx("Buttons")}>
        <Button onClick={handleCreate}>추가</Button>
      </div>
      <div className={cx("Content")}>
        <div className={cx("Header")}>
          <div className={cx("HeaderCol")}>번호</div>
          <div className={cx("HeaderCol")}>카테고리 이름</div>
          <div className={cx("HeaderCol")}>Key</div>
          <div className={cx("HeaderCol")}>수정</div>
          <div className={cx("HeaderCol")}>삭제</div>
        </div>
        <div className={cx("Body")}>{categoryList}</div>
      </div>
    </div>
  );
};

export default CategoryEdit;
