import React from 'react';
import CheckoutContainer from 'containers/Checkout/CheckoutContainer';
import AdminPageTemplate from 'components/admin/AdminPageTemplate';

const CheckoutPage = () => {
    return (
        <AdminPageTemplate>
            <CheckoutContainer/>
        </AdminPageTemplate>
    );
};

export default CheckoutPage;