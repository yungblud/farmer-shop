import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import CheckoutDetailContainer from 'containers/Checkout/CheckoutDetailContainer';
import { bindActionCreators } from 'redux';
import * as checkoutActions from 'store/modules/checkout';
const CheckoutDetailPage = ({match}) => {
    const { id } = match.params;
    return (
        <PageTemplate>
            <CheckoutDetailContainer id={id}/>
        </PageTemplate>
    );
};

CheckoutDetailPage.preload = (dispatch, params) => {
    const { id } = params;
    const config = {
        headers: { Pragma: 'no-cache'}
    };
    const CheckoutActions = bindActionCreators(checkoutActions, dispatch);
    return CheckoutActions.getUserCheckoutById(id, config);
}

export default CheckoutDetailPage;