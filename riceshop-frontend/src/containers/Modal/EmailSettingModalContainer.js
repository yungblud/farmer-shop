import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import MemberEmailSettingModal from 'components/modal/MemberEmailSettingModal';
import storage from 'lib/storage';
import {isEmail, isLength, isAlphanumeric} from 'validator';

class EmailSettingModalContainer extends Component {
    handleCancel = () => {
        const { BaseActions } = this.props;

        BaseActions.hideModal('emailSetting');
    }
  
    handleConfirm = () => {
        this.changeUserEmail();
    }

    handleChangeInput = ({name, value}) => {
        const { AuthActions } = this.props;
        AuthActions.changeInputSetting({name, value});
    }

    validate = {
        
        email: (value) => {
            const { AuthActions } = this.props;
            if(!isEmail(value)) {
                AuthActions.setErrorMessageWithCode({errorCode: 200, errorLog: "잘못된 이메일 형식입니다."});
                return false;
            }
            return true;
        }
    }

    changeUserEmail = async () => {
        const { AuthActions, BaseActions, loggedInfo, email } = this.props;
        const validation = this.validate["email"](email);
        if(!validation) return;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {   
            await AuthActions.changeUserInfo({id: loggedInfo.get('id'), value: email, type: "email"}, config);
            await storage.set('loggedInfo', this.props.settingInfo);
            const loggedInfoStorage = storage.get('loggedInfo');
            await AuthActions.setLoggedInfo(loggedInfoStorage);
            BaseActions.hideModal('emailSetting');
            
        } catch(e){
            console.log(e);
        }
    }
 render() {
    const { emailModalVisible, email, errorCode, errorLog } = this.props;
    const { handleCancel, handleConfirm, handleChangeInput } = this;
   return (
    <MemberEmailSettingModal 
        emailModalVisible={emailModalVisible} 
        onCancel={handleCancel} 
        onConfirm={handleConfirm}
        email={email}
        onChangeInput={handleChangeInput}
        errorCode={errorCode}
        errorLog={errorLog}
        />
   );
 }
}

export default connect(
  (state) => ({
    emailModalVisible: state.base.getIn(['modal', 'emailSetting']),
    email: state.auth.getIn(['setting', 'email']),
    loggedInfo: state.auth.get('loggedInfo'),
    settingInfo: state.auth.get('settingInfo'),
    errorCode: state.auth.get('errorCode'),
    errorLog: state.auth.get('errorLog')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(EmailSettingModalContainer);