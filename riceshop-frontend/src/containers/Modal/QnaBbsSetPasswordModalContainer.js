import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as qnabbsActions from 'store/modules/qnabbs';
import QnaBbsSetPasswordModal from 'components/modal/QnaBbsSetPasswordModal';
import storage from 'lib/storage';

class QnaBbsSetPasswordModalContainer extends Component {

    handleChangeInput = ({name, value}) => {
        const { QnaBbsActions } = this.props;
        QnaBbsActions.changeInput({name, value}); 
    }

    handleWriteQna = async () => {
        const { QnaBbsActions, title, content, isprivate } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            let contentText = content;
            contentText = contentText.replace(/\r?\n/g, '<br />');
            await QnaBbsActions.writeQna({title, content: contentText, username: storage.get('loggedInfo').userID, isprivate}, config);
            window.location.href = "/qna";
        } catch(e) {
            console.log(e);
        }
    }

    hideModal = () => {
        const { QnaBbsActions } = this.props;
        QnaBbsActions.hidePasswordModal();
    }

    handlePrivate = async () => {
        const { QnaBbsActions, title, content } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            let contentText = content;
            contentText = contentText.replace(/\r?\n/g, '<br />');
            await QnaBbsActions.writeQna({title, content: contentText, username: storage.get('loggedInfo').userID, isprivate: true}, config);
            window.location.href = "/qna";
        } catch(e) {
            console.log(e);
        }
    }

    handleNoPrivate = async () => {
        const { QnaBbsActions, title, content } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            let contentText = content;
            contentText = contentText.replace(/\r?\n/g, '<br />');
            await QnaBbsActions.writeQna({title, content: contentText, username: storage.get('loggedInfo').userID, isprivate: false}, config);
            window.location.href = "/qna";
        } catch(e) {
            console.log(e);
        }
    }
 render() {
     const { handleChangeInput, 
            handleWriteQna, 
            hideModal,
            handlePrivate,
            handleNoPrivate } = this;
     const { qnabbspassword, passwordModalVisible } = this.props;
   return (
    <QnaBbsSetPasswordModal
        onChangeInput={handleChangeInput}
        qnabbspassword={qnabbspassword}
        onWriteQna={handleWriteQna}
        visible={passwordModalVisible}
        hideModal={hideModal}
        onPrivate={handlePrivate}
        onNoPrivate={handleNoPrivate}/>
   );
 }
}

export default connect(
  (state) => ({
      qnabbspassword: state.qnabbs.get('qnabbspassword'),
      title: state.qnabbs.get('title'),
      content: state.qnabbs.get('content'),
      passwordModalVisible: state.qnabbs.get('passwordModalVisible')
  }),
  (dispatch) => ({
      QnaBbsActions: bindActionCreators(qnabbsActions, dispatch)
  })
)(QnaBbsSetPasswordModalContainer);