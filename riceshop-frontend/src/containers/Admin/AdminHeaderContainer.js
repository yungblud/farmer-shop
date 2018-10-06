import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as baseActions from "store/modules/base";
import AdminHeader from "components/admin/AdminHeader";
import storage from "lib/storage";

class AdminHeaderContainer extends Component {
  adminLogout = async () => {
    const { BaseActions } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await BaseActions.adminLogout(config);
    } catch (e) {
      console.log(e.payload);
    }
    storage.remove("adminLogged");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  adminCheck = async () => {
    const { BaseActions } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await BaseActions.adminCheck(config);
      if (!this.props.adminLogged) {
        alert("관리자가 아니네요..");
        document.location.href = "/";
      }
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.adminCheck();
  }
  render() {
    const { adminLogout } = this;
    const { adminLogged } = this.props;
    if (!this.props.adminLogged) return null;
    return (
      <AdminHeader onAdminLogout={adminLogout} adminLogged={adminLogged} />
    );
  }
}

export default connect(
  state => ({
    adminLogged: state.base.get("adminLogged")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(AdminHeaderContainer);
