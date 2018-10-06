import React from 'react';
import styles from './UserCheckoutList.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

const UserCheckoutList = ({list, parcelList, getParcelData, parcel, onSelect, isFiltered, filteredUserCheckoutList}) => {

  const reloadPage = () => {
    window.location.reload();
  }

  const handleSelect = (e) => {
    const { value } = e.target;
    onSelect({value});
  }

  const CheckoutList = list.map((checkout, i) => {
    const splitted_ordered_list = checkout.get('ordered_list').split(",");
    let state = "";
    if (checkout.get("checked")) {
      if (checkout.get("songjang")) {

        state = parcelList[i];

      } else {
        state = "no songjang";
      }
    } else {
      if (checkout.get("cancelled")) {
        state = "환불대기중";
      } else {
        if (checkout.get("pay_backed")) {
          state = "환불 완료";
        } else {
          state = "배송 준비중";
        }
      }
    }

    let status = "";

    const getStatus = () => {
      if(checkout.get("iscomplete")) {
        status = "배송 완료";
        return status;
      } 

      if(checkout.get("pay_backed")) {
        status = "환불 완료";
        return status;
      }
  
      if(checkout.get("checked")) {
        status = "배송중";
        return status;
      }
      return "배송 준비 중";
    }

    
    

    return (
      <Link to={`/checkout/${checkout.get('id')}`} className={cx('line')} key={i}>
        <div className={cx('content')}>
          {splitted_ordered_list.length >= 3
            ? splitted_ordered_list[0] + " 외 " + (splitted_ordered_list.length - 2) + "건"
            : checkout
              .get('ordered_list')
              .slice(0, -1)
          }

        </div>
        <div className={cx('content')}>
          {checkout.get('paid_amount')}
        </div>
        <div className={cx('content')}>
        {
          getStatus()
        }
        {/* {
          checkout.get('pay_backed') && "환불 완료"
        }
          {
            !checkout.get('iscomplete')
            ? checkout.get('checked')
              ? "배송중"
              : checkout.get('cancelled')
                ? checkout.get('pay_backed')
                  ? "환불 완료"
                  : "환불 대기중"
                : "배송 준비 중"
                : "구매 확정"
          } */}
        </div>

        {/* </div> */}
      </Link>
    )
  });

  const FilteredCheckoutList = filteredUserCheckoutList.map((checkout, i) => {
    const splitted_ordered_list = checkout.get('ordered_list').split(",");
    let state = "";
    if (checkout.get("checked")) {
      if (checkout.get("songjang")) {

        state = parcelList[i];

      } else {
        state = "no songjang";
      }
    } else {
      if (checkout.get("cancelled")) {
        state = "환불대기중";
      } else {
        if (checkout.get("pay_backed")) {
          state = "환불 완료";
        } else {
          state = "배송 준비중";
        }
      }
    }

    let status = "";

    const getStatus = () => {
      if(checkout.get("iscomplete")) {
        status = "배송 완료";
        return status;
      } 

      if(checkout.get("pay_backed")) {
        status = "환불 완료";
        return status;
      }
  
      if(checkout.get("checked")) {
        status = "배송중";
        return status;
      }
      return "배송 준비 중";
    }

    return (
      <Link to={`/checkout/${checkout.get('id')}`} className={cx('line')} key={i}>
        <div className={cx('content')}>
          {splitted_ordered_list.length >= 3
            ? splitted_ordered_list[0] + " 외 " + (splitted_ordered_list.length - 2) + "건"
            : checkout
              .get('ordered_list')
              .slice(0, -1)
          }

        </div>
        <div className={cx('content')}>
          {checkout.get('paid_amount')}
        </div>
        <div className={cx('content')}>
        {
          getStatus()
        }
          {/* {!checkout.get('iscomplete')
            ? checkout.get('checked')
              ? "배송중"
              : checkout.get('cancelled')
                ? checkout.get('pay_backed')
                  ? "환불 완료"
                  : "환불 대기중"
                : "배송 준비 중"
                : "구매 확정"
          } */}
        </div>

        {/* </div> */}
      </Link>
    )
  });

  return (
    <div className={cx('user-checkoutlist')}>
      <div className={cx('top-wrapper')}>
        <div className={cx('description')} onClick={reloadPage}>
          주문 리스트
        </div>
        <div className={cx('button-wrapper')}>
          <div className={cx('button')}>
            <select className={cx('selector')} onChange={handleSelect}>
              <option value="all">모두 보기</option>
              <option value="checked">배송된 상품만 보기</option>
              <option value="unchecked">배송안된 상품만 보기</option>
              {/* <option value="cancelled">주문 취소된 상품만 보기</option> */}
              <option value="paybacked">환불 완료된 상품만 보기</option>
              <option value="completed">구매완료 리스트만 보기</option>
            </select>
          </div>
        </div>
      </div>
      <div className={cx('shadowed-box')}>
        <div className={cx('desc')}>
          <div className={cx('column')}>
            상품 이름
          </div>
          <div className={cx('column')}>
            총 결제 금액
          </div>
          <div className={cx('column')}>
            상태
          </div>
        </div>
        {
          isFiltered ? FilteredCheckoutList : 
          list.size === 0
          ? <div className={cx('empty')}>
              현재 주문하신 상품이 없습니다.
            </div>
          : CheckoutList
        }

      </div>

    </div>
  );

}
export default UserCheckoutList;