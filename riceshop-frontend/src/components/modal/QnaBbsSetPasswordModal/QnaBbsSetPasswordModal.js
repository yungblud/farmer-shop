import React from 'react';
import styles from './QnaBbsSetPasswordModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';

const cx = classNames.bind(styles);

const QnaBbsSetPasswordModal = ({onChangeInput, qnabbspassowrd, visible, hideModal, onWriteQna, onPrivate, onNoPrivate}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }
  return (
    <ModalWrapper visible={visible}>
      <div className={cx('form')}>
        <div className={cx('label')}>
          비공개로 하시겠습니까?
        </div>
        {/* <div className={cx('input-wrapper')}>
          <input 
              className={cx('input')} 
              type="password" 
              name="qnabbspassword"
              value={qnabbspassowrd}
              onChange={handleChange}/>
        </div> */}
        <div className={cx('button-wrapper')}>
          <div className={cx('submit-button')} onClick={onPrivate}>
            예
          </div>
          <div className={cx('cancel-button')} onClick={onNoPrivate}>
            아니오
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default QnaBbsSetPasswordModal;