import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AdminCheckoutDetail from "components/checkout/AdminCheckoutDetail";
import AdminCheckoutDetailWrapper from "components/checkout/AdminCheckoutDetailWrapper";
import * as checkoutActions from "store/modules/checkout";
import { withRouter } from "react-router-dom";
import storage from "lib/storage";

class AdminCheckoutDetailContainer extends Component {
  getCheckoutById = async () => {
    const { CheckoutActions, id } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await CheckoutActions.getCheckoutById(id, config);
    } catch (e) {
      console.log(e);
    }
  };

  setChecked = async () => {
    const { CheckoutActions, history, id, songjang } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };

    try {
      if (songjang === "") {
        await CheckoutActions.setChecked(id, "none");
        history.push("/admin/list");
        return;
      }
      await CheckoutActions.setChecked(id, songjang, config);
      history.push("/admin/list");
    } catch (e) {
      console.log(e);
    }
  };

  setPayback = async () => {
    const { CheckoutActions, id, history } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await CheckoutActions.setPayback({ id }, config);
      alert("환불 처리로 변경 되었습니다.");
      history.push("/admin/list");
    } catch (e) {
      console.log(e);
    }
  };

  handleChange = ({ name, value }) => {
    const { CheckoutActions } = this.props;
    CheckoutActions.changeInput({ name, value });
  };

  setComplete = async () => {
    const { CheckoutActions, id, checkout } = this.props;

    try {
    //   const userID = storage.get("loggedInfo").userID;
      await CheckoutActions.setComplete({ id, userID: checkout.buyer_id });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getCheckoutById();
  }

  updateSongjang = () => {
    const { CheckoutActions } = this.props;
    CheckoutActions.updateSongjangNumber();
  };

  handleUpdateSongjangWithApi = async () => {
    const { CheckoutActions, songjang, id } = this.props;

    const config = {
      headers: { Pragma: "no-cache" }
    };

    try {
      await CheckoutActions.updateSongjangNumberWithApi(
        { id, songjang },
        config
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  cancelCheck = async () => {
    const { CheckoutActions, id } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await CheckoutActions.cancelCheck({ id }, config);
      alert("배송 미 처리로 변경되었습니다.");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { checkout, loading } = this.props;
    const {
      setChecked,
      handleChange,
      setPayback,
      updateSongjang,
      cancelCheck,
      handleUpdateSongjangWithApi,
      setComplete
    } = this;
    if (loading) return null;
    return (
      <AdminCheckoutDetailWrapper>
        <AdminCheckoutDetail
          checkout={checkout}
          onSetCheck={setChecked}
          onChange={handleChange}
          onPayback={setPayback}
          onUpdateSongjang={updateSongjang}
          onUpdateSongjangWithApi={handleUpdateSongjangWithApi}
          onCancelCheck={cancelCheck}
          onSetComplete={setComplete}
        />
      </AdminCheckoutDetailWrapper>
    );
  }
}

export default connect(
  state => ({
    checkout: state.checkout.get("checkout"),
    loading: state.pender.pending["checkout/GET_CHECKOUT_BY_ID"],
    songjang: state.checkout.get("songjang")
  }),
  dispatch => ({
    CheckoutActions: bindActionCreators(checkoutActions, dispatch)
  })
)(withRouter(AdminCheckoutDetailContainer));
