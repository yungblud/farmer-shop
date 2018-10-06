import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as cartActions from "store/modules/cart";
import * as postActions from "store/modules/post";
import * as baseActions from "store/modules/base";
import CartWrapper from "components/cart/CartWrapper";
import CartContent from "components/cart/CartContent";
import CartTable from "components/cart/CartTable";

class CartContainer extends Component {
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

  componentDidMount() {
    this.getCartList();
  }

  setSelectedCart = ({cart}) => {
    const { CartActions } = this.props;

    CartActions.setSelectedCart({cart});
  }

  setNumber = ({value}) => {
    this.props.CartActions.setNumber({value});
  } 

  showModal = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('cart');
  }

  getPostItemById = async id => {
    const { PostActions, CartActions } = this.props;

    const config = {
      headers: { Pragma: "no-cache" }
    };

    try {
      await PostActions.getPostItemById(id, config);

      let thumbnailImage = "";
      const { markdown } = this.props.item.toJS();
      if (!markdown.includes("/api/uploads/")) {
        thumbnailImage = "image?default_thumbnail.png";
      } else {
        thumbnailImage = markdown.split("/api/uploads/")[1].split(")")[0];
      }

      CartActions.setSelectedThumbnail({thumbnail: thumbnailImage});

    } catch (e) {
      console.log(e);
    }
  };

  removeCartById = async e => {
    const { CartActions } = this.props;
    const removeId = e.target.getAttribute("removeid");
    const config = {
      headers: { Pragma: "no-cache" }
    };

    try {
      await CartActions.removeCartById(removeId, config);
    } catch (e) {
      console.log(e);
    }
  };


  render() {
    const { cartList, loading, totalPrice } = this.props;
    const { removeCartById, getPostItemById, setSelectedCart, setNumber, showModal } = this;
    if (loading) return null;
    return (
      //  <div>
      //    <input type="text" value={JSON.stringify(cartList)} style={{width: "100%", height: "3rem"}}/>
      //   </div>
      <CartWrapper>
        <CartContent>
          <CartTable
            cartList={cartList}
            totalPrice={totalPrice}
            onRemoveById={removeCartById}
            getPostItemById={getPostItemById}
            setSelectedCart={setSelectedCart}
            setNumber={setNumber}
            showModal={showModal}
          />
        </CartContent>
      </CartWrapper>
    );
  }
}

export default connect(
  state => ({
    cartList: state.cart.get("cartList"),
    loading: state.pender.pending["cart/GET_CART_LIST"],
    totalPrice: state.cart.get("totalPrice"),
    item: state.post.get("item"),

  }),
  dispatch => ({
    CartActions: bindActionCreators(cartActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    
  })
)(CartContainer);
