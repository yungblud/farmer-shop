import React from 'react';
import AdminCheckoutDetailContainer from 'containers/AdminCheckoutDetail/AdminCheckoutDetailContainer';
import AdminPageTemplate from 'components/admin/AdminPageTemplate';
import { bindActionCreators } from 'redux';
import * as checkoutActions from 'store/modules/checkout';
import UpdateSongjangModalContainer from 'containers/Modal/UpdateSongjangModalContainer';
const AdminCheckoutDetail = ({match}) => {
    const { id } = match.params;
    return (
        <AdminPageTemplate>
            <AdminCheckoutDetailContainer id={id}/>
            <UpdateSongjangModalContainer id={id}/>
        </AdminPageTemplate>
    );
};

AdminCheckoutDetail.preload = (dispatch, params) => {
    const { id } = params;
    const config = {
        headers: { Pragma: 'no-cache'}
    };
    const CheckoutActions = bindActionCreators(checkoutActions, dispatch);
    return CheckoutActions.getCheckoutById(id, config);
}

export default AdminCheckoutDetail;