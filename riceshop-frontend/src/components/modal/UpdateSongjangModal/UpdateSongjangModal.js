import React from 'react';
import styles from './UpdateSongjangModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
const cx = classNames.bind(styles);

const UpdateSongjangModal = ({visible, onCancel, onChangeInput, songjang, onUpdate}) => {
    const handleChange = (e) => {
        const { value, name } = e.target;
        onChangeInput({name, value});
    }
        return (
            <ModalWrapper visible={visible}>
                <div className={cx('form')}>
                    <div className={cx('label')}>
                        바꾸실 송장 번호를 입력해주세요
                    </div>
                    <div className={cx('input-wrapper')}>
                        <input 
                            type="text" 
                            name="songjang" 
                            className={cx('input')}
                            onChange={handleChange}
                            value={songjang}/>
                    </div>
                    <div className={cx('button-wrapper')}>
                        <div className={cx('submit-button')} onClick={onUpdate}>
                            수정
                        </div>
                        <div className={cx('cancel-button')} onClick={onCancel}>
                            취소
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        );
};

export default UpdateSongjangModal;