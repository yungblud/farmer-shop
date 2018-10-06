import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "store/modules/cart";
import * as baseActions from "store/modules/base";
import CartModal from "components/modal/CartModal";

class CartModalContainer extends Component {
  handleChange = ({ value }) => {
    const { CartActions } = this.props;
    CartActions.changeNumber({ value });
  };

  hideModal = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal("cart");
  };

  addCart = async ({ ver }) => {
    const { selectedCart, number, CartActions, selectedThumbnail } = this.props;
    const eachPrice = parseInt(
      selectedCart.toJS().totalPrice / selectedCart.toJS().amount,
      10
    );
    const totalPrice = parseInt(eachPrice * number, 10);
    const selectedOption = selectedCart.toJS().option;
    const { id, title } = selectedCart.toJS();

    if(number > 99) {
        alert("수량은 99개까지만 가능합니다.");
        return;
    }

    if (number === "") {
      alert("수량을 선택해주세요.");
      return;
    }

    const config = {
      headers: { Pragma: "no-cache" }
    };

    try {
      await CartActions.addCart(
        {
          id,
          title,
          amount: number,
          thumbnailImage: selectedThumbnail,
          totalPrice,
          option: selectedOption,
          ver
        },
        config
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { number, visible } = this.props;
    const { handleChange, hideModal, addCart } = this;
    return (
      <CartModal
        number={number}
        visible={visible}
        onChangeNumber={handleChange}
        onHideModal={hideModal}
        addCart={addCart}
      />
    );
  }
}

export default connect(
  state => ({
    number: state.cart.get("number"),
    visible: state.base.getIn(["modal", "cart"]),
    selectedCart: state.cart.get("selectedCart"),
    selectedThumbnail: state.cart.get("selectedThumbnail")
  }),
  dispatch => ({
    CartActions: bindActionCreators(cartActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(CartModalContainer);
