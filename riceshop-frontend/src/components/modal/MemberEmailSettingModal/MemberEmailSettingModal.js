import React from 'react';
import styles from './MemberEmailSettingModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';
const cx = classNames.bind(styles);

const MemberEmailSettingModal = ({emailModalVisible, onCancel, onConfirm, email, onChangeInput, errorCode, errorLog}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }
  return (
    <ModalWrapper visible={emailModalVisible}>
        <div className={cx('question')}>
        <div className={cx('title')}>바꿀 이메일을 입력하세요</div>
        <div className={cx('errorMessage')} style={{display: errorCode === "" ? "none" : "block"}}>{errorLog}</div>
        </div>
        <div className={cx('form-wrapper')}>  
          <input type="email" name="email" onChange={handleChange} value={email} className={cx('input')}/>
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
export default MemberEmailSettingModal;