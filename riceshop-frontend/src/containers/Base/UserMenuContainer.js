import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as baseActions from 'store/modules/base';
import onClickOutside from 'react-onclickoutside';
import UserMenu from 'components/base/UserMenu';
import Username from 'components/base/Username';
import UserMenuItem from 'components/base/UserMenuItem';
import {Link, withRouter} from 'react-router-dom';
class UserMenuContainer extends Component {

    handleClickOutside = (e) => {
        const {BaseActions, visible} = this.props;
        if (visible) {
            return BaseActions.setUserMenuVisibility(false);
        }
        BaseActions.setUserMenuVisibility(true);
    }

    handleCheckoutListMenuClick = (e) => {
        const {BaseActions, history} = this.props;
        history.push("/checkout");
        BaseActions.setUserMenuVisibility(false);
    }

    toMemberSetting = () => {
        const { BaseActions, history } = this.props;
        history.push("/member");
        BaseActions.setUserMenuVisibility(false);
    }

    render() {
        const {visible} = this.props;
        const { handleCheckoutListMenuClick, toMemberSetting } = this;
        if (!visible) {
            return null;
        }

        const ClickableMenuItem = ({children, onClick}) => {
            return (
                <div onClick={onClick}>{children}</div>
            )
        }

        return (
            <UserMenu>
                <Username username={localStorage.userID}/>
                <UserMenuItem onClick={handleCheckoutListMenuClick}>
                    <ClickableMenuItem>
                        주문 정보
                    </ClickableMenuItem>
                </UserMenuItem>
                <UserMenuItem onClick={toMemberSetting}>설정</UserMenuItem>
            </UserMenu>
        );
    }
}

export default connect((state) => ({
    visible: state
        .base
        .getIn(['userMenu', 'visible'])
}), (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
}))(withRouter(onClickOutside(UserMenuContainer)));