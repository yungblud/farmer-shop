import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PaymentWrapper from "components/payment/PaymentWrapper";
import PaymentList from "components/payment/PaymentList";
import CartTable from "components/cart/CartTable";
import AuthContent from "components/auth/AuthContent";
import InputWithLabel from "components/auth/InputWithLabel";
import InputWithLabelPhone from "components/auth/InputWithLabelPhone";
import InputPhoneWrapper from "components/auth/InputPhoneWrapper";
import { withRouter } from "react-router-dom";
import { isEmail, isLength, isAlphanumeric } from "validator";
import * as cartActions from "store/modules/cart";
import * as paymentActions from "store/modules/payment";
import Button from "components/common/Button";
import storage from "lib/storage";

if (typeof window === "undefined") {
  global.window = {};
}
const $ = window.$;

var IMP = window.IMP;
const isBrowser = process.env.APP_ENV === "browser";
if (isBrowser) {
  IMP.init("YOUR_IMPORT_KEY");
}

const daum = window.daum;
class PaymentContainer extends Component {
  getCartList = async () => {
    const { CartActions } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };

    try {
      await CartActions.getCartList(config);
    } catch (e) {
      console.log(e);
    }
  };

  getAccessToken = async () => {
    let merchant_uid = Math.random()
      .toString(36)
      .substring(7);
    const { PaymentActions, totalPrice } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await PaymentActions.getAccessToken(config);
      const config = {
        headers: { Pragma: "no-cache" }
      };
      if (!this.props.iamportError) {
        await PaymentActions.getMerchantUid(
          {
            merchant_uid,
            accessToken: this.props.accessToken,
            amount: totalPrice
          },
          config
        );

        if (this.props.iamportAmount === totalPrice) {
          const {
            totalPrice,
            userEmail,
            userName,
            userPhonePost,
            userPhoneCenter,
            userPhoneRear,
            userAddress,
            userDetailAddress,
            userPostCode,
            CartActions
          } = this.props;

          let amount = parseInt(totalPrice, 10) + 3000;
          let buyer_email = userEmail;
          let buyer_name = userName;
          let buyer_tel =
            userPhonePost + "-" + userPhoneCenter + "-" + userPhoneRear;
          let buyer_address = userAddress + " / " + userDetailAddress;
          let buyer_postcode = userPostCode;
          let ordered_list = "";
          let ordered_number = "";
          let item_number = "";
          let buyer_id = storage.get("loggedInfo").userID;
          let splitted_ordered_list = "";
          if (this.props.cartList.length > 1) {
            splitted_ordered_list += `${this.props.cartList[0].title}-${
              this.props.cartList[0].option
            } ${this.props.cartList[0].amount}개 외 ${this.props.cartList
              .length - 1}건`;
          } else {
            splitted_ordered_list += `${this.props.cartList[0].title}-${
              this.props.cartList[0].option
            } ${this.props.cartList[0].amount}개`;
          }
          this.props.cartList.map((cart, i) => {
            ordered_list += cart.title + "-" + cart.option + ",";
            ordered_number += cart.amount + ",";
            item_number += cart.id + ",";
          });

          IMP.request_pay(
            {
              pg: "html5_inicis",
              pay_method: "card",
              merchant_uid: "merchant_" + new Date().getTime(),
              name: splitted_ordered_list,
              amount: amount,
              buyer_email: buyer_email,
              buyer_name: buyer_name,
              buyer_tel: buyer_tel,
              buyer_addr: buyer_address,
              buyer_postcode: buyer_postcode
            },
            function(rsp) {
              if (rsp.success) {
                $.ajax({
                  url: "/api/payment/complete",
                  type: "POST",
                  dataType: "json",
                  data: {
                    imp_uid: rsp.imp_uid,
                    merchant_uid: rsp.merchant_uid,
                    paid_amount: rsp.paid_amount,
                    apply_num: rsp.apply_num,
                    buyer_email: buyer_email,
                    buyer_name: buyer_name,
                    buyer_tel: buyer_tel,
                    buyer_addr: buyer_address,
                    buyer_postcode: buyer_postcode,
                    ordered_list: ordered_list,
                    ordered_number: ordered_number,
                    buyer_id: buyer_id,
                    item_number: item_number
                  }
                }).done(function(data) {
                  // console.log(data);
                  var msg = "결제가 완료되었습니다! 감사합니다.";
                  // msg += '고유ID : ' + rsp.imp_uid; msg += '상점 거래ID : ' + rsp.merchant_uid; msg
                  // += '결제 금액 : ' + rsp.paid_amount; msg += '카드 승인번호 : ' + rsp.apply_num;
                  alert(msg);
                  const config = {
                    headers: { Pragma: "no-cache" }
                  };
                  CartActions.removeCart(config);
                  document.location.href = "/";
                });
              } else {
                var msg = "결제에 실패하였습니다.";
                msg += "에러내용 : " + rsp.error_msg;
                alert(msg);
              }
            }
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  getUserInfo = async () => {
    const { PaymentActions } = this.props;
    let loggedInfo = storage.get("loggedInfo");

    try {
      await PaymentActions.getUserInfo({ id: loggedInfo.id });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    if (localStorage.memberLogged !== "true") {
      const { history } = this.props;
      alert("로그인을 하셔야 주문하실수 있습니다. 로그인페이지로 이동합니다.");
      history.push("/login");
      return;
    }

    this.getUserInfo();
    this.getCartList();
    // this.props.PaymentActions.initialize();
  }

  componentDidUpdate(prevProps, prevState) {
    const { history } = this.props;
    if (prevProps.cartList !== this.props.cartList) {
      if (this.props.cartList.length === 0) {
        alert("결제하실 상품이 없습니다.");
        history.push("/");
      }
    }
  }

  componentWillUnmount() {
    $(window).unbind();
  }
  handleChange = e => {
    const { PaymentActions } = this.props;
    const { name, value } = e.target;
    PaymentActions.changeInput({ name, value });
  };

  handlePay = () => {
    const { validate } = this;
    const {
      userEmail,
      userName,
      userPhonePost,
      userPhoneCenter,
      userPhoneRear,
      userDetailAddress,
      userAddress,
      userPostCode
    } = this.props;
    if (
      !validate["email"](userEmail) ||
      !validate["username"](userName) ||
      !validate["phonePost"](userPhonePost) ||
      !validate["phoneCenter"](userPhoneCenter) ||
      !validate["phoneRear"](userPhoneRear) ||
      !validate["detailAddress"](userDetailAddress)
    ) {
      // 하나라도 실패하면 진행하지 않음
      return;
    }
    if (!userAddress) {
      alert("주소를 입력해주세요.");
      return;
    }
    if (!userPostCode) {
      alert("우편번호를 검색해주세요.");
      return;
    }

    this.getAccessToken();
  };

  validate = {
    email: value => {
      if (!isEmail(value)) {
        alert("잘못된 이메일 형식 입니다.");
        return false;
      }
      return true;
    },
    username: value => {
      if (!isLength(value, { min: 2, max: 15 })) {
        alert("주문자 성함을 정확히 작성해주세요.");
        return false;
      }
      return true;
    },
    phonePost: value => {
      if (!isLength(value, { min: 2, max: 3 })) {
        alert("정확한 핸드폰 번호를 입력해주세요.");
        return false;
      }
      return true;
    },
    phoneCenter: value => {
      if (!isLength(value, { min: 3, max: 4 })) {
        alert("정확한 핸드폰 번호를 입력해주세요.");
        return false;
      }
      return true;
    },
    phoneRear: value => {
      if (!isLength(value, { min: 3, max: 4 })) {
        alert("정확한 핸드폰 번호를 입력해주세요.");
        return false;
      }
      return true;
    },
    detailAddress: value => {
      if (!isLength(value, { min: 1, max: 200 })) {
        alert("정확한 상세 주소를 입력해주세요.");
        return false;
      }
      return true;
    }
  };

  handleAddressMapOpen = () => {
    const { PaymentActions } = this.props;
    new daum.Postcode({
      oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분. 각 주소의 노출 규칙에 따라 주소를 조합한다. 내려오는 변수가 값이 없는
        // 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullAddr = ""; // 최종 주소 변수
        var extraAddr = ""; // 조합형 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          fullAddr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          fullAddr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
        if (data.userSelectedType === "R") {
          //법정동명이 있을 경우 추가한다.
          if (data.bname !== "") {
            extraAddr += data.bname;
          }
          // 건물명이 있을 경우 추가한다.
          if (data.buildingName !== "") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
          fullAddr += extraAddr !== "" ? " (" + extraAddr + ")" : "";
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        $("input[id=buyer_postcode]").val(data.zonecode);
        $("input[id=buyer_addr]").val(fullAddr);
        PaymentActions.changeInput({
          name: "userPostCode",
          value: data.zonecode
        });
        PaymentActions.changeInput({ name: "userAddress", value: fullAddr });

        // 커서를 상세주소 필드로 이동한다.
        $("input[id=detail_addr]").focus();
      }
    }).open();
  };
  render() {
    const { handleAddressMapOpen, handleChange, handlePay } = this;
    const {
      cartList,
      totalPrice,
      userName,
      userEmail,
      userPhonePost,
      userPhoneCenter,
      userPhoneRear,
      userAddress,
      userPostCode,
      userDetailAddress,
      memberLogged
    } = this.props;

    return (
      <PaymentWrapper>
        <PaymentList title="주문 리스트">
          <CartTable
            ver="payment"
            cartList={cartList}
            totalPrice={totalPrice}
          />
          <AuthContent mode="payment" onButtonClick={handlePay} buttonText="결제하기">
            <InputWithLabel
              value={userName}
              onChange={handleChange}
              label="주문자 이름"
              name="userName"
              placeholder="주문자 이름"
            />
            <InputPhoneWrapper label="핸드폰 번호">
              <InputWithLabelPhone
                value={userPhonePost}
                onChange={handleChange}
                name="userPhonePost"
                placeholder="앞 번호"
              />
              <InputWithLabelPhone
                value={userPhoneCenter}
                onChange={handleChange}
                name="userPhoneCenter"
                placeholder="중간 번호"
              />
              <InputWithLabelPhone
                value={userPhoneRear}
                onChange={handleChange}
                name="userPhoneRear"
                placeholder="뒷 번호"
              />
            </InputPhoneWrapper>
            <InputWithLabel
              value={userEmail}
              onChange={handleChange}
              label="이메일"
              name="userEmail"
              placeholder="이메일"
            />
            <InputWithLabel
              id="buyer_addr"
              onClick={handleAddressMapOpen}
              value={userAddress}
              onChange={handleChange}
              label="주소 검색"
              name="userAddress"
              placeholder="주소를 검색하기위해 클릭해주세요."
              version="address"
            />
           
            <InputWithLabel
              id="buyer_postcode"
              disabled="true"
              label="우편번호"
              value={userPostCode}
              onChange={handleChange}
              name="userPostCode"
              placeholder="우편번호"
            />
            <InputWithLabel
              id="detail_addr"
              label="상세 주소"
              name="userDetailAddress"
              value={userDetailAddress}
              onChange={handleChange}
              placeholder="상세 주소 입력"
            />
          </AuthContent>
        </PaymentList>
      </PaymentWrapper>
    );
  }
}

export default connect(
  state => ({
    cartList: state.cart.get("cartList"),
    totalPrice: state.cart.get("totalPrice"),
    userName: state.payment.get("userName"),
    userPhonePost: state.payment.get("userPhonePost"),
    userPhoneCenter: state.payment.get("userPhoneCenter"),
    userPhoneRear: state.payment.get("userPhoneRear"),
    userAddress: state.payment.get("userAddress"),
    userPostCode: state.payment.get("userPostCode"),
    userDetailAddress: state.payment.get("userDetailAddress"),
    userEmail: state.payment.get("userEmail"),
    memberLogged: state.base.get("memberLogged"),
    iamportError: state.payment.get("iamportError"),
    accessToken: state.payment.get("accessToken"),
    merchantUid: state.payment.get("merchantUid"),
    iamportAmount: state.payment.get("iamportAmount"),
    userInfo: state.payment.get("userInfo")
  }),
  dispatch => ({
    CartActions: bindActionCreators(cartActions, dispatch),
    PaymentActions: bindActionCreators(paymentActions, dispatch)
  })
)(withRouter(PaymentContainer));
