import React from 'react';
import styles from './AdminCheckoutDetail.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
const cx = classNames.bind(styles);

const AdminCheckoutDetail = ({checkout, 
                              onSetCheck,
                              onChange,
                              onPayback,
                              onUpdateSongjang, 
                              onCancelCheck,
                              onUpdateSongjangWithApi,
                              onSetComplete}) => {
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    onChange({name, value});
  }
  return (
    <div className={cx('detail')}>
      <div className={cx('form')}>
        <div className={cx('form-contents')}>
          <div className={cx('content')}>
          주문번호: {checkout.id}
          </div>
        </div>
        <div className={cx('form-contents')}>
        <div className={cx('content')}>
        배송여부: {checkout.checked ? "배송처리 완료" : "배송하지 않음"}
        </div>
        </div>
        {
          checkout.cancelled && 
          <div className={cx('form-contents')}>
          <div className={cx('content')}>
          환불처리 여부: {checkout.pay_backed ? "환불처리 완료" : "환불처리 미완료"}
          </div>
          </div>
        }
        <div className={cx('form-contents')}>
        <div className={cx('content')}>
        지불가격: {checkout.paid_amount}
        </div>
        </div>
        <div className={cx('form-contents')}>
        <div className={cx('content')}>
        주문자 전화번호: { checkout.buyer_tel }
        </div>
        </div>
        <div className={cx('form-contents')}>
        <div className={cx('content')}>
        주문자 아이디: { checkout.buyer_id }
        </div>
        </div>
        <div className={cx('form-contents')}>
        <div>
        주문한 리스트: {checkout.ordered_list}
        </div>
        </div>
        <div className={cx('form-contents')}>
        <div>
        주문한 수량: {checkout.ordered_number}
        </div>
        </div>
        <div className={cx('form-contents')}>
        <div>
        주문자 이메일: {checkout.buyer_email}
        </div>
        </div>
        <div className={cx('form-contents')}>
        <div>
        주문자 이름: {checkout.buyer_name}
        </div>
        </div>
        <div className={cx('form-contents')}>
        <div>
        주문자 우편번호: {checkout.buyer_postcode}
        </div>
        </div>
        <div className={cx('form-contents')}>
        <div>
        주문 일시: {checkout.createdAt}
        </div>
        </div>
        <div className={cx('form-contents')}>
        <div>
        주문자 주소: {checkout.buyer_addr}
        </div>
        </div>
        {
          checkout.songjang && 
          <div className={cx('form-contents')}>
          <div>
            송장 번호: {checkout.songjang}
          </div>
          <div className={cx('button-wrapper')}>
            <div className={cx('button')} onClick={onUpdateSongjang}>
              수정하기
            </div>
          </div>
          </div>
        }
      </div>
      {
        checkout.cancelled ? 
        <div className={cx('payback-button')}>
            <Button onClick={onPayback} theme="admin-payback">
              환불 처리 완료
            </Button>
          </div>
        : 
        <div>
          {
            !checkout.songjang &&
            <div className={cx('songjang-input')}>
            <div className={cx('label')}>
              송장 번호 입력
            </div>
            <input type="text" name="songjang" onChange={onChangeInput}/>
            <div className={cx('button-wrapper')}>
              <div className={cx('button')} onClick={onUpdateSongjangWithApi}>
                송장번호입력
              </div>
            </div>
          </div>
          }
          
          {
            !checkout.checked ?
            <div className={cx('complete-button')}>
              <Button onClick={onSetCheck} theme="admin-default">
                배송 처리
              </Button>
            </div>
            :
            <div className={cx('complete-cancel-button')}>
              <div className={cx("Button")}>
                <Button onClick={onCancelCheck} theme="admin-default-cancel">
                  배송 처리 취소
                </Button>
              </div>
              <div className={cx("Button")}>
                <Button onClick={onSetComplete} theme="admin-default-confirm">
                  구매 확정
                </Button>
              </div>
              <div className={cx("Button")}>
                <Button onClick={onPayback} theme="admin-default-payback">
                  환불 처리 완료
                </Button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
  
}
export default AdminCheckoutDetail;