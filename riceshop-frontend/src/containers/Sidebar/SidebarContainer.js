import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as baseActions from "store/modules/base";
import Sidebar from "components/common/Sidebar";
import Hamburger from "components/common/Hamburger";
import onClickOutside from "react-onclickoutside";
import storage from "lib/storage";

class SidebarContainer extends Component {
  handleClickOutside = e => {
    const { BaseActions } = this.props;
    BaseActions.hideSidebar();
  };
  handleOpen = () => {
    const { BaseActions } = this.props;
    BaseActions.showSidebar();
  };

  handleClose = () => {
    const { BaseActions } = this.props;
    BaseActions.hideSidebar();
  };

  handleToggle = () => {
    const { visible } = this.props;
    const { handleClose, handleOpen } = this;
    if (visible) return handleClose();
    handleOpen();
  };

  adminLogout = async () => {
    const { BaseActions } = this.props;
    try {
      await BaseActions.adminLogout();
    } catch (e) {
      console.log(e.payload);
    }
    storage.remove("adminLogged");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  memberLogout = async () => {
    const { BaseActions } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await BaseActions.memberLogout(config);
    } catch (e) {
      console.log(e);
    }

    storage.remove("loggedInfo");
    window.location.href = "/";
  };

  goToCartPage = () => {
    document.location.href = "/cart";
  };
  render() {
    const {
      handleClose,
      handleToggle,
      adminLogout,
      memberLogout,
      goToCartPage
    } = this;
    const { visible, adminLogged, memberLogged, categories } = this.props;
    return [
      <Sidebar
        adminLogout={adminLogout}
        adminLogged={adminLogged}
        memberLogged={memberLogged}
        memberLogout={memberLogout}
        visible={visible}
        onClose={handleClose}
        goToCartPage={goToCartPage}
        categories={categories}
        key={0}
      />,
      <Hamburger active={visible} onToggle={handleToggle} key={1} />
    ];
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(["sideBar", "visible"]),
    categories: state.category.get('categories')
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(SidebarContainer);
