import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthWrapper from 'components/auth/AuthWrapper';
import AuthContent from 'components/auth/AuthContent';
import InputWithLabel from 'components/auth/InputWithLabel';
import Button from 'components/common/Button';
import * as authActions from 'store/modules/auth';
import * as baseActions from 'store/modules/base';
import { withRouter } from 'react-router-dom';
import storage from 'lib/storage';
import InputPhoneWrapper from 'components/auth/InputPhoneWrapper/InputPhoneWrapper';
import InputWithLabelPhone from 'components/auth/InputWithLabelPhone/InputWithLabelPhone';

if (typeof window === 'undefined') {
    global.window = {}
}
const $ = window.$;
const daum = window.daum;

class FormContainer extends Component {

    initialize = () => {
        const { AuthActions } = this.props;
        AuthActions.initialize();

    }

    componentDidMount() {
        // if(localStorage.adminLogged === "true" || localStorage.memberLogged === "true") {
        //     alert("이미 로그인 하셨습니다.");
        //     document.location.href = "/";
        // }
        this.initialize();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.title !== this.props.title) {
            this.initialize();
        }
    }



    handleChangeInput = (e) => {
        const { name, value } = e.target;
        const { AuthActions } = this.props;
        AuthActions.changeInput({ name, value });
    }



    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.adminLogin();
        }
    }

    handleRegister = async () => {
        const { AuthActions, history } = this.props;
        const { userID,
            userEmail,
            userPassword,
            userPasswordConfirm,
            userName, userAddress,
            userPostCode,
            userDetailAddress,
            userPhonePost, userPhoneCenter, userPhoneRear } = this.props.input.toJS();

        if (userID === "") {
            AuthActions.setErrorMessage({ errorMessage: "아이디를 입력해주세요" });
            return;
        }
        if (userPassword === "" || userPasswordConfirm === "") {
            AuthActions.setErrorMessage({ errorMessage: "비밀번호를 입력해주세요" });
            return;
        }
        if (userPassword !== userPasswordConfirm) {
            AuthActions.setErrorMessage({ errorMessage: "두 비밀번호가 같지 않습니다" });
            return;
        }
        if (userName === "") {
            AuthActions.setErrorMessage({ errorMessage: "이름을 입력해주세요" });
            return;
        }
        if (userEmail === "") {
            AuthActions.setErrorMessage({ errorMessage: "이메일을 입력해주세요" });
            return;
        }
        if (userAddress === "") {
            AuthActions.setErrorMessage({ errorMessage: "주소를 입력해주세요" });
            return;
        }
        if (userPostCode === "") {
            AuthActions.setErrorMessage({ errorMessage: "주소를 입력해주세요" });
            return;
        }
        if (userDetailAddress === "") {
            AuthActions.setErrorMessage({ errorMessage: "상세 주소를 입력해주세요" });
            return;
        }
        if(userPhonePost === "" || userPhoneCenter === "" || userPhoneRear === "") {
            AuthActions.setErrorMessage({ errorMessage: "휴대전화를 입력해주세요" });
            return;
        }
        const config = {
            headers: { Pragma: 'no-cache' }
        };
        try {
            await AuthActions.register({ userID, userPassword, userEmail, userName, userAddress, userPostCode, userDetailAddress, userPhone: `${userPhonePost}-${userPhoneCenter}-${userPhoneRear}` }, config);
            this.initialize();
            alert("회원가입 되었습니다! 로그인 페이지로 이동합니다.");
            history.push('/login');
        } catch (e) {
            console.log(e);
        }
    }

    handleKeyPressRegister = (e) => {
        if (e.key === "Enter") {
            this.handleRegister();
        }
    }

    handleMemberLogin = async () => {
        const { AuthActions, history } = this.props;
        const { userID, userPassword } = this.props.input.toJS();

        const config = {
            headers: { Pragma: 'no-cache' }
        };
        try {
            await AuthActions.login({ userID, userPassword }, config);
            // console.log(this.props.memberLoggedResult);
            const loggedInfo = this.props.memberLoggedResult;
            storage.set('loggedInfo', loggedInfo);
            localStorage.memberLogged = "true";
            AuthActions.setLoggedInfo(loggedInfo);
            history.push("/");
        } catch (e) {
            console.log(e);
        }
    }

    adminLogin = async () => {
        const { BaseActions, history } = this.props;
        const { userID, userPassword } = this.props.input.toJS();
        const config = {
            headers: { Pragma: 'no-cache' }
        };

        try {
            await BaseActions.adminLogin({ adminID: userID, password: userPassword }, config);
            storage.set('adminLogged', true);
            this.initialize();
            history.push('/admin/list');
        } catch (e) {
            console.log(e);
        }
    }

    handleKeyPressMemberLogin = (e) => {
        if (e.key === "Enter") {
            this.handleMemberLogin();
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     const { AuthActions } = this.props;
    //     if(prevProps.errorMessage !== this.props.errorMessage && this.props.errorMessage !== "") {
    //         alert(this.props.errorMessage);
    //         AuthActions.resetErrorMessage();
    //     }
    // }

    handleAddressMapOpen = () => {

        const { AuthActions } = this.props;
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분. 각 주소의 노출 규칙에 따라 주소를 조합한다. 내려오는 변수가 값이 없는
                // 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullAddr = ''; // 최종 주소 변수
                var extraAddr = ''; // 조합형 주소 변수

                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    fullAddr = data.roadAddress;

                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    fullAddr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
                if (data.userSelectedType === 'R') {
                    //법정동명이 있을 경우 추가한다.
                    if (data.bname !== '') {
                        extraAddr += data.bname;
                    }
                    // 건물명이 있을 경우 추가한다.
                    if (data.buildingName !== '') {
                        extraAddr += (extraAddr !== ''
                            ? ', ' + data.buildingName
                            : data.buildingName);
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== ''
                        ? ' (' + extraAddr + ')'
                        : '');
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                $('input[id=buyer_postcode]').val(data.zonecode);
                $('input[id=buyer_addr]').val(fullAddr);
                AuthActions.changeInput({ name: 'userPostCode', value: data.zonecode });
                AuthActions.changeInput({ name: 'userAddress', value: fullAddr });

                // 커서를 상세주소 필드로 이동한다.
                $('input[id=detail_addr]').focus();
            }
        }).open();
    }



    render() {
        const { title } = this.props;
        const { handleChangeInput,
            adminLogin,
            handleKeyPress,
            handleRegister,
            handleKeyPressRegister,
            handleMemberLogin,
            handleKeyPressMemberLogin,
            handleAddressMapOpen } = this;

        const { userID,
            userPassword,
            userPasswordConfirm,
            userEmail,
            userName,
            userPhonePost,
            userPhoneCenter,
            userPhoneRear,
            userAddress,
            userPostCode,
            userDetailAddress } = this.props.input.toJS();
        // const title = ""; if(category === "/login") {     title = "로그인"; } else {
        // title = "회원가입"; }
        if (title === "로그인") {
            const { memberLogged, errorFlashVisible, errorMessage } = this.props;
            if (memberLogged) {

                return null;
            }
            return (
                <AuthWrapper>
                    <AuthContent mode="login" title={title} onButtonClick={handleMemberLogin} buttonText={title} visible={errorFlashVisible} errorMessage={errorMessage}>
                        <InputWithLabel onChange={handleChangeInput} label="아이디" value={userID} name="userID" placeholder="아이디" />
                        <InputWithLabel onChange={handleChangeInput} type="password" label="비밀번호" value={userPassword} name="userPassword" placeholder="비밀번호" onKeyPress={handleKeyPressMemberLogin} />
                    </AuthContent>
                </AuthWrapper>
            );
        }
        if (title === "회원가입") {
            const { memberLogged, errorFlashVisible, errorMessage } = this.props;
            if (memberLogged) {
                return null;
            }
            return (
                <AuthWrapper>
                    <AuthContent title={title} onButtonClick={handleRegister} buttonText={title} visible={errorFlashVisible} errorMessage={errorMessage}>
                        <InputWithLabel onChange={handleChangeInput} label="아이디" value={userID} name="userID" placeholder="아이디" />
                        <InputWithLabel onChange={handleChangeInput} type="password" label="비밀번호" value={userPassword} name="userPassword" placeholder="비밀번호" />
                        <InputWithLabel
                            onChange={handleChangeInput}
                            label="비밀번호 확인"
                            value={userPasswordConfirm}
                            type="password"
                            name="userPasswordConfirm"
                            placeholder="비밀번호 확인" />
                        <InputWithLabel onChange={handleChangeInput} label="이름" value={userName} name="userName" placeholder="이름" onKeyPress={handleKeyPressRegister} />
                        <InputWithLabel onChange={handleChangeInput} label="이메일" value={userEmail} name="userEmail" placeholder="이메일" />
                        <InputPhoneWrapper label="핸드폰 번호">
                            <InputWithLabelPhone
                                value={userPhonePost}
                                onChange={handleChangeInput}
                                name="userPhonePost"
                                placeholder="앞 번호" />
                            <InputWithLabelPhone
                                value={userPhoneCenter}
                                onChange={handleChangeInput}
                                name="userPhoneCenter"
                                placeholder="중간 번호" />
                            <InputWithLabelPhone
                                value={userPhoneRear}
                                onChange={handleChangeInput}
                                name="userPhoneRear"
                                placeholder="뒷 번호" />
                        </InputPhoneWrapper>
                        <Button theme="address" onClick={handleAddressMapOpen}>주소 검색 하기</Button>
                        <InputWithLabel
                            onChange={handleChangeInput}
                            label="주소"
                            value={userAddress}
                            name="userAddress"
                            placeholder="주소"
                            disabled={true}
                            id="buyer_addr"
                        ></InputWithLabel>
                        <InputWithLabel
                            onChange={handleChangeInput}
                            label="우편번호"
                            value={userPostCode}
                            name="userPostCode"
                            id="buyer_postcode"
                            disabled={true}
                            placeholder="우편번호"></InputWithLabel>
                        <InputWithLabel
                            onChange={handleChangeInput}
                            label="상세 주소"
                            value={userDetailAddress}
                            name="userDetailAddress"
                            id="detail_addr"
                            placeholder="상세 주소를 입력해주세요"></InputWithLabel>
                    </AuthContent>
                </AuthWrapper>
            );
        }
        if (title === "관리자 로그인") {
            const { adminLogged, errorVisible, errorMessageBase } = this.props;
            if (adminLogged) {
                return null;
            }
            return (
                <AuthWrapper>
                    <AuthContent visible={errorVisible} errorMessage={errorMessageBase} title={title} onButtonClick={adminLogin} buttonText={title}>
                        <InputWithLabel onChange={handleChangeInput} label="아이디" value={userID} name="userID" placeholder="아이디" />
                        <InputWithLabel onKeyPress={handleKeyPress} onChange={handleChangeInput} type="password" label="비밀번호" value={userPassword} name="userPassword" placeholder="비밀번호" />
                    </AuthContent>
                </AuthWrapper>
            );
        }

    }
}

export default connect((state) => ({
    input: state.auth.get('input'),
    adminLogged: state.base.get('adminLogged'),
    errorMessage: state.auth.get('errorMessage'),
    memberLogged: state.base.get('memberLogged'),
    errorFlashVisible: state.auth.get('errorFlashVisible'),
    errorVisible: state.base.get('errorVisible'),
    errorMessageBase: state.base.get('errorMessage'),
    memberLoggedResult: state.auth.get('memberLoggedResult')
}), (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
}))(withRouter(FormContainer));