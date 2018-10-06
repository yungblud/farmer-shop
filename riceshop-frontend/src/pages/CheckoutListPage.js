import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import CheckoutListContainer from 'containers/Checkout/CheckoutListContainer';

const CheckoutListPage = (props) => {
    return (
        <PageTemplate>
            <CheckoutListContainer/>
        </PageTemplate>
    );
};

export default CheckoutListPage;