import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as checkoutActions from 'store/modules/checkout';
import UserCheckoutDetailWrapper from 'components/checkout/UserCheckoutDetailWrapper';
import UserCheckoutDetail from 'components/checkout/UserCheckoutDetail';
import {withRouter} from 'react-router-dom';
import storage from 'lib/storage';

class CheckoutDetailContainer extends Component {
    getUserCheckoutById = async() => {
        const {CheckoutActions, id} = this.props;
        const config = {
            headers: {
                Pragma: 'no-cache'
            }
        };
        try {
            await CheckoutActions.getUserCheckoutById({
                userID: localStorage.userID,
                id
            }, config);
            await CheckoutActions.getParcelCrawledData({
                songjang: this.props.userCheckoutDetail.songjang
            }, config);
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getUserCheckoutById();
        // this.getParcelCrawledData();
    }

    setCancel = async() => {
        const {CheckoutActions, id, history} = this.props;
        const config = {
            headers: {
                Pragma: 'no-cache'
            }
        };
        try {
            await CheckoutActions.setCancel({
                id
            }, config);
            alert("선택하신 상품의 주문이 취소되었습니다.");
            history.push("/checkout");
        } catch (e) {
            console.log(e);
        }
    }

    setComplete = async() => {
        const {CheckoutActions, id} = this.props;
        const config = {
            headers: {
                Pragma: 'no-cache'
            }
        };

        try {
            const userID = storage
                .get('loggedInfo')
                .userID;
            await CheckoutActions.setComplete({id, userID});
            window
                .location
                .reload();
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const {userCheckoutDetail, loading, parcel} = this.props;
        const {setCancel, setComplete} = this;
        if (loading) 
            return null;
        return (
            <UserCheckoutDetailWrapper>
                <UserCheckoutDetail
                    userCheckoutDetail={userCheckoutDetail}
                    parcel={parcel}
                    onCancel={setCancel}
                    onComplete={setComplete}/>
            </UserCheckoutDetailWrapper>
        );
    }
}

export default connect((state) => ({
    userCheckoutDetail: state
        .checkout
        .get('userCheckoutDetail'),
    loading: state.pender.pending['checkout/GET_USER_CHECKOUT_BY_ID'],
    parcel: state
        .checkout
        .get('parcel')
}), (dispatch) => ({
    CheckoutActions: bindActionCreators(checkoutActions, dispatch)
}))(withRouter(CheckoutDetailContainer));