import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckoutList from 'components/checkout/CheckoutList';
import CheckoutWrapper from 'components/checkout/CheckoutWrapper';
import * as checkoutActions from 'store/modules/checkout';

class CheckoutContainer extends Component {
    getCheckoutList = async () => {
        const { CheckoutActions, topFilterValue } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            await CheckoutActions.getCheckoutList({filter: topFilterValue}, config);
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getCheckoutList();
    }

    // getUncheckedList = async() => {
    //     const { CheckoutActions } = this.props;
    //     try {
    //         await CheckoutActions.getUncheckedList();

    //     } catch(e){
    //         console.log(e);
    //     }
    // }

    handleSelect = async ({value}) => {
        const { CheckoutActions } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {   
            await CheckoutActions.getCheckoutList({filter: value}, config);
            CheckoutActions.handleTopFilterSelect({value: value});
        } catch(e){
            console.log(e);
        }
    }

    handleSearchSelect = ({value}) => {
        const { CheckoutActions } = this.props;
        CheckoutActions.handleSelect({value});
    }   

    search = async () => {
        const { CheckoutActions, selectedValue, search } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            await CheckoutActions.search({filter: selectedValue, value: search}, config);
        } catch(e){
            console.log(e);
        }
    }

    handleSearchKeyPress = (e) => {
        if(e.key === "Enter") {
            this.search();
        }
        
    }

    handleChangeInput = ({name, value}) => {
        const { CheckoutActions } = this.props;
        CheckoutActions.changeInput({name, value});
    }

 render() {
     const { list } = this.props;
     const { handleSelect, handleSearchSelect, handleChangeInput, search, handleSearchKeyPress } = this;
     const { adminLogged, topFilterValue } = this.props;
     if(!adminLogged) {
         return null;
     }
   return (
    <CheckoutWrapper 
        onSelect={handleSelect} 
        onSearchSelect={handleSearchSelect} 
        onChangeInput={handleChangeInput}
        onSearch={search}
        onKeyPress={handleSearchKeyPress}
        topFilterValue={topFilterValue}>
        <CheckoutList checkoutList={list}/>
    </CheckoutWrapper>
   );
 }
}

export default connect(
  (state) => ({
      list: state.checkout.get('list'),
      selectedValue: state.checkout.get('selectedValue'),
      search: state.checkout.get('search'),
      adminLogged: state.base.get('adminLogged'),
      topFilterValue: state.checkout.get('topFilterValue')
  }),
  (dispatch) => ({
      CheckoutActions: bindActionCreators(checkoutActions, dispatch)
  })
)(CheckoutContainer);