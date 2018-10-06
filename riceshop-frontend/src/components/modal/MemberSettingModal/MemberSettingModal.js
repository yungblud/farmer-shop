import React from 'react';
import styles from './MemberSettingModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';
const cx = classNames.bind(styles);

const MemberSettingModal = ({passwordModalVisible, onConfirm, onCancel, password, passwordCheck, onChangeInput, errorCode, errorLog}) => {
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }
  return (
    <ModalWrapper visible={passwordModalVisible}>
        <div className={cx('question')}>
        <div className={cx('title')}>새 비밀번호를 입력하세요</div>
        <div className={cx('errorMessage')} style={{display: errorCode === "" ? "none" : "block" }}>{errorLog}</div>
        </div>
        <div className={cx('form-wrapper')}>  
          <input type="password" value={password} onChange={handleChangeInput} name="password" className={cx('input')}/>
          <input type="password" value={passwordCheck} onChange={handleChangeInput} name="passwordCheck" className={cx('input')}/>
        </div>
        <div className={cx('options')}>
          <div className={cx('button-wrapper')}>
            <Button theme="gray" onClick={onCancel}>취소</Button>
          </div>
          <div className={cx('button-wrapper')}>
            <Button theme="setting" onClick={onConfirm}>설정</Button>
          </div>
        </div>
    </ModalWrapper>
  );
}

export default MemberSettingModal;