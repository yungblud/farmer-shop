import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as baseActions from "store/modules/base";
import * as categoryActions from "store/modules/category";
import Header from "components/common/Header";
import storage from "lib/storage";
import MenuBar from "components/common/MenuBar";
import AuthBar from "components/common/AuthBar";
import { withRouter } from 'react-router-dom';

class HeaderContainer extends Component {

  // state = {
  //   loadingCategories: true
  // };

  componentDidMount() {
    this.getAllCategories();
  }

  handleMenuClick = () => {
    const { BaseActions, visible } = this.props;

    if (visible) {
      return BaseActions.setUserMenuVisibility(false);
    }
    BaseActions.setUserMenuVisibility(true);
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

  getAllCategories = async () => {
    const { CategoryActions } = this.props;

    try {
      await CategoryActions.getAllCategories();
      // this.setState({
      //   loadingCategories: false
      // });
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { adminLogged, memberLogged, loggedInfo, categories } = this.props;
    const { memberLogout, handleMenuClick } = this;
    // const { loadingCategories } = this.state;
    return (
      <div>
        <AuthBar
          adminLogged={adminLogged}
          memberLogged={memberLogged}
          memberLogout={memberLogout}
          onMenuClick={handleMenuClick}
          loggedInfo={loggedInfo}
        />
        <Header
          adminLogged={adminLogged}
          memberLogged={memberLogged}
          memberLogout={memberLogout}
          onMenuClick={handleMenuClick}
          loggedInfo={loggedInfo}
        />
        <MenuBar 
          categories={categories}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    adminLogged: state.base.get("adminLogged"),
    memberLogged: state.auth.get("memberLogged"),
    visible: state.base.getIn(["userMenu", "visible"]),
    loggedInfo: state.auth.get("loggedInfo"),
    categories: state.category.get('categories')
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    CategoryActions: bindActionCreators(categoryActions, dispatch)
  })
)(withRouter(HeaderContainer));
