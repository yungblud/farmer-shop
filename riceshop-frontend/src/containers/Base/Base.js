import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import storage from 'lib/storage';

class Base extends Component {

    initialize = () => {
        const adminLogged = storage.get('adminLogged');
        if(!adminLogged) return;
        const { BaseActions } = this.props;
        BaseActions.adminTempLogin();
        try {
            BaseActions.adminCheck();
        } catch(e){
            storage.remove('adminLogged');
            window.location.href = "/auth/login?expired";
        }
    }

    initializeMember = () => {
        const loggedInfo = storage.get('loggedInfo');
        // console.log('loggedInfo', loggedInfo)
        if(!loggedInfo) return;

        const { BaseActions, AuthActions } = this.props;
        AuthActions.setLoggedInfo(loggedInfo);
        const config = {
            headers: { Pragma: 'no-cache'}
        };

        // try {
        //      BaseActions.memberCheck(config);
        // } catch(e){
        //     storage.remove('loggedInfo');
        //     window.location.href = "/auth/login?expired";
        // }

    }

    componentDidMount() {
        this.initialize();
        this.initializeMember();
    }
 render() {
     
   return (
    <div></div>
   );
 }
}

export default connect(
  (state) => ({
    
  }),
  (dispatch) => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Base);