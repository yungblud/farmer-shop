import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import MemberSettingModal from 'components/modal/MemberSettingModal';
import {isEmail, isLength, isAlphanumeric} from 'validator';

class MemberSettingModalContainer extends Component {
    handleCancel = () => {
        const { BaseActions } = this.props;
        BaseActions.hideModal('passwordSetting');
    }
  
    handleConfirm = () => {
        this.changeUserPassword();
    }

    handleChange = ({name, value}) => {
        const { AuthActions } = this.props;
        AuthActions.changeInputSetting({name, value});
    }

    validate = {
        password: (value) => {
            const { AuthActions } = this.props;

            if(!isLength(value, { min: 6 })) {
                AuthActions.setErrorMessageWithCode({errorCode: 100, errorLog: "비밀번호는 6자 이상으로 해주세요"});
                return false;
            }
            // AuthActions.setErrorMessageWithCode({errorCode: '', errorLog: ''});// 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
            return true;
        },
        passwordCheck: (value) => {
            const { passwordCheck, AuthActions } = this.props;
            if(passwordCheck !== value) {
                AuthActions.setErrorMessageWithCode({errorCode: 100, errorLog: "비밀번호가 일치하지 않습니다"});
                return false;
            }
            // AuthActions.setErrorMessageWithCode({errorCode: '', errorLog: ''});
            return true;
        }
    }

    changeUserPassword = async () => {
        const { AuthActions, BaseActions, loggedInfo, password, passwordCheck } = this.props;
        const validationPassword = this.validate["password"](password);
        const validationPasswordCheck = this.validate["passwordCheck"](password);
        
        if(!validationPassword || !validationPasswordCheck) {
            console.log("returning");
            return;
        }
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {   
            await AuthActions.changeUserInfo({id: loggedInfo.get('id'), value: passwordCheck, type: "password"}, config);
            BaseActions.hideModal('emailSetting');
            window.location.reload();
        } catch(e){
            console.log(e);
        }
    }
  
 render() {
    const { passwordModalVisible, password, passwordCheck, errorCode, errorLog } = this.props;
    const { handleCancel, handleConfirm, handleChange } = this;
   return (
    <MemberSettingModal 
        passwordModalVisible={passwordModalVisible} 
        onCancel={handleCancel} 
        onConfirm={handleConfirm}
        password={password}
        passwordCheck={passwordCheck}
        onChangeInput={handleChange}
        errorCode={errorCode}
        errorLog={errorLog}/>
   );
 }
}

export default connect(
  (state) => ({
    passwordModalVisible: state.base.getIn(['modal', 'passwordSetting']),
    password: state.auth.getIn(['setting', 'password']),
    passwordCheck: state.auth.getIn(['setting', 'passwordCheck']),
    errorCode: state.auth.get('errorCode'),
    errorLog: state.auth.get('errorLog'),
    loggedInfo: state.auth.get('loggedInfo')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(MemberSettingModalContainer);