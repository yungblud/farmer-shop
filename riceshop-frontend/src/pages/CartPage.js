import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import CartContainer from 'containers/Cart/CartContainer';
import CartModalContainer from 'containers/Modal/CartModalContainer';

const CartPage = (props) => {
    return (
        <PageTemplate>
            <CartContainer/>
            <CartModalContainer />
        </PageTemplate>
    );
};

export default CartPage;