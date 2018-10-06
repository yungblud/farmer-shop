import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PostWrapper from "components/post/PostWrapper";
import PostInfo from "components/post/PostInfo";
import PostBody from "components/post/PostBody";
import * as postActions from "store/modules/post";
import * as cartActions from "store/modules/cart";
import * as checkoutActions from "store/modules/checkout";
import { Helmet } from "react-helmet";
import removeMd from "remove-markdown";
import Spinner from "components/common/Spinner";
import storage from "lib/storage";
import { withRouter } from "react-router-dom";
class PostContainer extends Component {
  state = {
    imageUrlArr: [],
    imageLoading: true
  };

  initialize = async () => {
    const { PostActions, id } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await PostActions.getPostItemById(id, config);
      // console.log(this.props.item.toJS().markdown.match(/[image]((.*?)&istemp=false)/g));
      const result = [];
      let m;
      let rx = /[image]((.*?)&istemp=false)/g;
      while ((m = rx.exec(this.props.item.toJS().markdown)) !== null) {
        let resultString = m[1].split("mage](")[1].split("&istemp=false")[0];
        result.push(resultString);
      }
      this.setState({
        imageUrlArr: result,
        imageLoading: false
      });
    } catch (e) {
      console.log(e);
    }
  };

  getUserCheckoutList = async () => {
    const { CheckoutActions, id, PostActions } = this.props;
    let bought = false;
    
    let loggedInfo = JSON.parse(localStorage.getItem("loggedInfo"));
    if(loggedInfo) {
      try {
        await CheckoutActions.getUserCheckoutList({
          userID: JSON.parse(localStorage.getItem("loggedInfo")).userID
        });
        let boughtIdList = [];
        this.props.userCheckoutList.map((checkout, i) => {
          return boughtIdList.push(checkout.get("item_number").split(","));
        });
        boughtIdList.map((list, i) =>
          list.map((innerList, i) => {
            if (innerList === id) {
              bought = true;
            }
          })
        );
        PostActions.setIsBought({ isBought: bought });
      } catch (e) {
        console.log(e);
      }
    }
    // if(JSON.parse())
    
  };

  initializeItems = ({ initialPrice }) => {
    const { PostActions } = this.props;
    PostActions.initialize({ initialPrice });
  };

  getInitialAfterPostList = async () => {
    const { PostActions, id } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };

    try {
      await PostActions.getInitialAfterPostList({ itemid: id }, config);
    } catch (e) {
      console.log(e);
    }
  };

  getMoreAfterPostList = async () => {
    const { PostActions, id, lastId } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await PostActions.getMoreAfterPostList({ itemid: id, lastId }, config);
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.initialize();
    this.getUserCheckoutList();
    this.getInitialAfterPostList();
    document.documentElement.scrollTop = 0;
  }

  handleSelectionChanged = ({ value, option }) => {
    const { PostActions } = this.props;
    PostActions.selectorChanged({ value, option });
  };

  handleNumberChanged = ({ value }) => {
    const { PostActions } = this.props;
    PostActions.numberChanged({ value });
  };

  goToPaymentPage = async () => {
    const { CartActions, history } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await CartActions.removeCart(config);
      await this.addCart({ ver: "payment" });
      history.push("/payment");
    } catch (e) {
      console.log(e);
    }
  };

  addCart = async ({ ver }) => {
    const { CartActions, totalPrice, number, selectedOption } = this.props;
    const { id, title, markdown } = this.props.item.toJS();
    let thumbnailImage = "";
    if (!markdown.includes("/api/uploads/")) {
      thumbnailImage = "image?default_thumbnail.png";
    } else {
      thumbnailImage = markdown.split("/api/uploads/")[1].split(")")[0];
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
          thumbnailImage,
          totalPrice,
          option: selectedOption,
          ver
        },
        config
      );
      if (this.props.errorCode) {
        const { CartActions } = this.props;
        alert(this.props.errorLog);
        CartActions.initialize();
      }
      if (this.props.cartLog) {
        const { CartActions } = this.props;
        // alert(this.props.cartLog);
        this.props.history.push('/cart');
        CartActions.initialize();
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteItemById = async () => {
    const { PostActions, id, history } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await PostActions.deleteItemById(id, config);
      alert("상품이 삭제되었습니다.");
      history.push("/item");
    } catch (e) {
      console.log(e);
    }
  };

  handleUpdate = () => {
    const { PostActions, id, history } = this.props;
    history.push(`/editor?id=${id}`);
  };

  showMarkdown = () => {
    const { PostActions } = this.props;
    PostActions.showMarkdown();
  };

  showAfter = () => {
    const { PostActions } = this.props;
    PostActions.showAfter();
  };

  showPayback = () => {
    const { PostActions } = this.props;
    PostActions.showPayback();
  };

  handlePressUp = () => {
    const { PostActions } = this.props;
    PostActions.pressUpButton();
  };

  handlePressDown = () => {
    const { PostActions } = this.props;
    PostActions.pressDownButton();
  };
  render() {
    const {
      loading,
      eachPrice,
      totalPrice,
      number,
      cartLog,
      errorCode,
      errorLog,
      adminLogged,
      markdownVisible,
      afterVisible,
      paybackVisible,
      bought,
      id,
      afterPostList,
      minId,
      lastId
    } = this.props;

    if (loading) return null;

    const { title, markdown, options, prices } = this.props.item.toJS();
    const { imageUrlArr, imageLoading } = this.state;
    const {
      handleSelectionChanged,
      handleNumberChanged,
      initializeItems,
      addCart,
      goToPaymentPage,
      handleDeleteItemById,
      handleUpdate,
      showMarkdown,
      showAfter,
      showPayback,
      getMoreAfterPostList,
      handlePressUp,
      handlePressDown
    } = this;

    return (
      <div>
        {/* body 값이 있을 때만 Helmet 설정 */ markdown && (
          <Helmet>
            <title>{title}</title>
            <meta
              name="description"
              content={removeMd(markdown).slice(0, 200)}
            />
          </Helmet>
        )}
        <PostWrapper
          postInfo={
            <PostInfo
              markdown={markdown}
              onUpdate={handleUpdate}
              onRemoveItem={handleDeleteItemById}
              adminLogged={adminLogged}
              initialize={initializeItems}
              title={title}
              prices={prices}
              number={number}
              options={options}
              eachPrice={eachPrice}
              onSelectorChange={handleSelectionChanged}
              onNumberChange={handleNumberChanged}
              totalPrice={totalPrice}
              onAddCart={addCart}
              goToPay={goToPaymentPage}
              onPressUp={handlePressUp}
              onPressDown={handlePressDown}
              imageUrlArr={imageUrlArr}
              imageLoading={imageLoading}
            />
          }
          postBody={
            <PostBody
              itemTitle={title}
              itemId={id}
              bought={bought}
              showMarkdown={showMarkdown}
              showAfter={showAfter}
              showPayback={showPayback}
              markdown={markdown}
              markdownVisible={markdownVisible}
              afterVisible={afterVisible}
              paybackVisible={paybackVisible}
              afterPostList={afterPostList}
              getMoreAfterPostList={getMoreAfterPostList}
              minId={minId}
              lastId={lastId}
            />
          }
        />
        <Spinner visible={loading} />
      </div>
    );
  }
}

export default connect(
  state => ({
    item: state.post.get("item"),
    loading: state.pender.pending["post/GET_POST_ITEM_BY_ID"],
    eachPrice: state.post.get("eachPrice"),
    totalPrice: state.post.get("totalPrice"),
    number: state.post.get("number"),
    errorLog: state.cart.getIn(["cartError", "errorLog"]),
    errorCode: state.cart.getIn(["cartError", "errorCode"]),
    cartLog: state.cart.get("cartLog"),
    adminLogged: state.base.get("adminLogged"),
    selectedOption: state.post.get("selectedOption"),
    markdownVisible: state.post.getIn(["visible", "markdown"]),
    afterVisible: state.post.getIn(["visible", "after"]),
    paybackVisible: state.post.getIn(["visible", "payback"]),
    userCheckoutList: state.checkout.get("userCheckoutList"),
    bought: state.post.get("bought"),
    afterPostList: state.post.get("afterPostList"),
    lastId: state.post.get("lastId"),
    minId: state.post.get("afterPostMinId")
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch),
    CartActions: bindActionCreators(cartActions, dispatch),
    CheckoutActions: bindActionCreators(checkoutActions, dispatch)
  })
)(withRouter(PostContainer));
