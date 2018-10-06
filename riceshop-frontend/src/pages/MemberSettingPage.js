import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import MemberSettingContainer from 'containers/Member/MemberSettingContainer';
import MemberSettingModalContainer from 'containers/Modal/MemberSettingModalContainer';
import EmailSettingModalContainer from 'containers/Modal/EmailSettingModalContainer';

const MemberSettingPage = () => {
    return (
        <PageTemplate>
            <MemberSettingContainer/>
            <MemberSettingModalContainer/>
            <EmailSettingModalContainer/>
        </PageTemplate>
    );
};


MemberSettingPage.preload = (dispatch, params) => {
    const { id } = params;
    // const CheckoutActions = bindActionCreators(checkoutActions, dispatch);
    // return CheckoutActions.getUserCheckoutById(id);
}

export default MemberSettingPage;