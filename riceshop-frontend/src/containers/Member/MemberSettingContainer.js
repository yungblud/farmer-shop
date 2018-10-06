import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import storage from 'lib/storage';
import MemberSettingFormWrapper from 'components/member/MemberSettingFormWrapper';
import MemberSettingForm from 'components/member/MemberSettingForm';

class MemberSettingContainer extends Component {

    authCheck = async () => {
        const loggedInfo = storage.get('loggedInfo');

        if(!loggedInfo) {
            alert("접근할수 없습니다.");
            window.location.href = "/";
            return;
        }

        const { AuthActions } = this.props;
        await AuthActions.setLoggedInfo(loggedInfo);
        // console.log(this.props.loggedInfo.get('id'));
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            AuthActions.settingCheck({id: this.props.loggedInfo.get('id')}, config);
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.authCheck();
    }

    handlePasswordChangePassword = async () => {
        const { BaseActions, AuthActions } = this.props;
        await AuthActions.initializeModal();
        await AuthActions.resetErrorMessage();
        BaseActions.showModal('passwordSetting');
    }
    handleEmailChangePassword = async () => {
        const { BaseActions, AuthActions } = this.props;
        await AuthActions.initializeModal();
        await AuthActions.resetErrorMessage();
        BaseActions.showModal('emailSetting');
    }
 render() {
     const { settingInfo } = this.props;
     const { handlePasswordChangePassword, handleEmailChangePassword } = this;
   return (
    <MemberSettingFormWrapper>
        <MemberSettingForm 
            info={settingInfo} 
            onPasswordChangeModalClick={handlePasswordChangePassword}
            onEmailChangeModalClick={handleEmailChangePassword}/>
    </MemberSettingFormWrapper>
   );
 }
}

export default connect(
  (state) => ({
    loggedInfo: state.auth.get('loggedInfo'),
    settingInfo: state.auth.get('settingInfo')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
})
)(MemberSettingContainer);