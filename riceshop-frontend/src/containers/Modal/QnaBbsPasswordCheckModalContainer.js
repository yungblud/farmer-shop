import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as qnabbsActions from 'store/modules/qnabbs';
import QnaBbsPasswordCheckModal from 'components/modal/QnaBbsPasswordCheckModal';
import { withRouter } from 'react-router-dom';

class QnaBbsPasswordCheckModalContainer extends Component {
    hideModal = () => {
        const { QnabbsActions } = this.props;
        QnabbsActions.hidePasswordModalInTable();
    }



    handleChangeInput = ({name, value}) => {
        const { QnabbsActions } = this.props;
        QnabbsActions.changeInput({name, value});
    }

    checkPassword = async () => {
        const { QnabbsActions, qnabbspassword, selecedQnaId, history } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            await QnabbsActions.checkPassword({password: qnabbspassword, id: selecedQnaId}, config);
            if(this.props.authorized) {
                history.push(`/qna/detail/${selecedQnaId}`);
                QnabbsActions.hidePasswordModalInTable();
            } 
        } catch(e) {
            console.log(e);
        }
    }
 render() {
     const { passwordModalInTableVisible, qnabbspassword, errored, errorMessage } = this.props;
     const { hideModal, handleChangeInput, checkPassword } = this;
   return (
    <QnaBbsPasswordCheckModal 
        visible={passwordModalInTableVisible}
        hideModal={hideModal}
        onChangeInput={handleChangeInput}
        password={qnabbspassword}
        checkPassword={checkPassword}
        errored={errored}
        errorMessage={errorMessage}/>
   );
 }
}

export default connect(
  (state) => ({
    passwordModalInTableVisible: state.qnabbs.get('passwordModalInTableVisible'),
    qnabbspassword: state.qnabbs.get('qnabbspassword'),
    selecedQnaId: state.qnabbs.get('selecedQnaId'),
    authorized: state.qnabbs.get('authorized'),
    errored: state.qnabbs.get('errored'),
    errorMessage: state.qnabbs.get('errorMessage')
  }),
  (dispatch) => ({
      QnabbsActions: bindActionCreators(qnabbsActions, dispatch)
  })
)(withRouter(QnaBbsPasswordCheckModalContainer));