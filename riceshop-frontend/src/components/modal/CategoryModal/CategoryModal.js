import React from 'react';
import styles from './CategoryModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const CategoryModal = ({visible, hideModal, onChangeInput, title, keyname, onCreate, version, onUpdate}) => (
  <ModalWrapper visible={visible} hideModal={hideModal}>
    <div className={cx('Content')}>
      <div className={cx("Title")}>
        카테고리 추가
      </div>
      <div className={cx('Input')}>
        <input 
          type="text" 
          name="title" 
          placeholder="카테고리 이름"
          value={title}
          onChange={onChangeInput} />
        <input 
          type="text" 
          name="keyname" 
          placeholder="카테고리 영문명"
          value={keyname}
          onChange={onChangeInput} />
      </div>
      <div className={cx('Button')}>
        {
          version === 'update' ? (
            <Button onClick={onUpdate}>수정하기</Button>
          ) : (
            <Button onClick={onCreate}>추가하기</Button>
          )
        }
      </div>
    </div>
  </ModalWrapper>
);

export default CategoryModal;