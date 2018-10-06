import React from 'react';
import styles from './CartModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const CartModal = ({visible, number, onChangeNumber, onHideModal, addCart}) => {

  const handleChange = (e) => {
    const { value } = e.target;
    onChangeNumber({value});
  }

  return (
    <ModalWrapper visible={visible} hideModal={onHideModal}>
      <div className={cx('Content')}>
        <div className={cx('Title')}>
          바꿀 수량
        </div>
        <div className={cx('Input')}>
          <input type="number" name="number" value={number} onChange={handleChange} />
        </div>
        <div className={cx('Button')}>
          <Button onClick={addCart}>변경하기</Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default CartModal;