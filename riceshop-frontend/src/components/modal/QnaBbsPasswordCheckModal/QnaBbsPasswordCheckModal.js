import React from 'react';
import styles from './QnaBbsPasswordCheckModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';


const cx = classNames.bind(styles);

const QnaBbsPasswordCheckModal = ({visible, hideModal, onChangeInput, password, checkPassword, errored, errorMessage}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }
  return (
    <ModalWrapper visible={visible}>
      <div className={cx('form')}>
        <div className={cx('label')}>
          비밀번호 확인
        </div>
        {
          errored && 
          <div className={cx('error')}>
          {errorMessage}
          </div>
        }
        <div className={cx('input-wrapper')}>
          <input
            type="password" 
            name="qnabbspassword" 
            className={cx('input')}
            onChange={handleChange}
            value={password} />
        </div>
        <div className={cx('button-wrapper')}>
          <div className={cx('submit-button')} onClick={checkPassword}>
            확인
          </div>
          <div className={cx('cancel-button')} onClick={hideModal}>
            취소
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default QnaBbsPasswordCheckModal;