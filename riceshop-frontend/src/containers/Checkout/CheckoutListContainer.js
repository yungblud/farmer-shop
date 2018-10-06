import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserCheckoutListWrapper from 'components/checkout/UserCheckoutListWrapper';
import UserCheckoutList from 'components/checkout/UserCheckoutList';
import * as checkoutActions from 'store/modules/checkout';
import storage from 'lib/storage';

class CheckoutListContainer extends Component {

    state = {
        parcelState: [],
        parcelList: [],
        finished: false
    };

    getUserCheckoutList = async () => {
        const { CheckoutActions } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            await CheckoutActions.getUserCheckoutList({userID: storage.get('loggedInfo').userID}, config); 

           
            
        } catch(e){
            console.log(e);
        }
    }

    

    componentDidMount() {
        this.getUserCheckoutList();
        
    }



    getParcelData = async ({songjang}) => {
        const { CheckoutActions } = this.props;
        try {
            await CheckoutActions.getParcelCrawledData({songjang});
            
        } catch(e) {
            console.log(e);
        }
    }

    getFilteredCheckoutList = async ({value}) => {
        const { CheckoutActions } = this.props;
        const userID = storage.get('loggedInfo').userID;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            await CheckoutActions.getCheckoutListByFilter({userID, filter: value}, config);
        } catch(e) {
            console.log(e);
        }
    }

    handleFilterSelect = ({value}) => {
        this.getFilteredCheckoutList({value});
    }
    
    

    render() {
        const { userCheckoutList, loading, parcel, isFiltered, filteredUserCheckoutList } = this.props;
        const { getParcelData, handleFilterSelect } = this;
        const { parcelList } = this.state;
        if(loading) return null;
        
      return (
       <UserCheckoutListWrapper>
           <UserCheckoutList 
                parcel={parcel} 
                list={userCheckoutList} 
                getParcelData={getParcelData} 
                parcelList={parcelList}
                onSelect={handleFilterSelect}
                isFiltered={isFiltered}
                filteredUserCheckoutList={filteredUserCheckoutList}/>
       </UserCheckoutListWrapper>
      );
    }
 
}

export default connect(
  (state) => ({
      userCheckoutList: state.checkout.get('userCheckoutList'),
      loading: state.pender.pending['checkout/GET_USER_CHECKOUT_LIST'],
      parcel: state.checkout.get('parcel'),
      isFiltered: state.checkout.get('isFiltered'),
      filteredUserCheckoutList: state.checkout.get('filteredUserCheckoutList')
  }),
  (dispatch) => ({
      CheckoutActions: bindActionCreators(checkoutActions, dispatch)
  })
)(CheckoutListContainer);