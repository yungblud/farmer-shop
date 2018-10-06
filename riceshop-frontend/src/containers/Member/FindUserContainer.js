import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as findActions from 'store/modules/find';
import FindMemberWrapper from 'components/member/FindMemberWrapper';
import FindMemberForm from 'components/member/FindMemberForm';
import { withRouter } from 'react-router-dom';
import SendingMail from 'components/member/SendingMail';

class FindUserContainer extends Component {
    
    state = {
        validated: false
    };

    componentDidMount() {
        this.initialize();
    }

    initialize = () => {
        const { FindActions } = this.props;
        FindActions.initialize();
    }

    handleChangeInput = ({name, value}) => {
        const { FindActions } = this.props;
        FindActions.changeInput({name, value});
    }

    handleFindUserId = async () => {
        const { FindActions } = this.props;
        const { username, userEmail1 } = this.props.input.toJS();

        try {
            await FindActions.findUserId({to: userEmail1, userName: username, userEmail: userEmail1});
            this.setState({
                validated: true
            });
            this.props.history.push("/find/success");
        } catch(e){
            console.log(e);
        }
    }

    handleFindPassword = async () => {
        const { FindActions } = this.props;
        const { userId, userEmail2 } = this.props.input.toJS();

        try {
            await FindActions.findPassword({to: userEmail2, userId, userEmail: userEmail2});
            this.props.history.push('/find/success');
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { userId, username, userEmail1, userEmail2 } = this.props.input.toJS();
        const { error, message } = this.props.error.toJS();
        const { handleChangeInput, handleFindUserId, handleFindPassword } = this;
        const { findUserIdSending, findUserPasswordSending } = this.props;
        return (
            <div>
                {
                    (findUserIdSending|| findUserPasswordSending) ? (
                        <SendingMail />
                    ) : 
                    (
                        <FindMemberWrapper
                    error={error}
                    errorMessage={message} >
                    <FindMemberForm 
                        userId={userId} 
                        username={username} 
                        userEmail1={userEmail1}
                        userEmail2={userEmail2}
                        onChangeInput={handleChangeInput}
                        onFindUserId={handleFindUserId}
                        onFindPassword={handleFindPassword}
                        />
                </FindMemberWrapper>
                    )

                }
            </div>
        );
    }
}

export default connect(
    (state) => ({
      input: state.find.get('input'),
      error: state.find.get('error'),
      findUserIdSending: state.pender.pending['find/FIND_USERID'],
      findUserPasswordSending: state.pender.pending['find/FIND_PASSWORD']
    }),
    (dispatch) => ({
      FindActions: bindActionCreators(findActions, dispatch),
  })
  )(withRouter(FindUserContainer));