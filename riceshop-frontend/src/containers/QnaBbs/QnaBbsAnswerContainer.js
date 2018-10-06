import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as qnaBbsActions from 'store/modules/qnabbs';
import QnaBbsEditorTemplate from 'components/qnabbs/QnaBbsEditorTemplate';
import QnaBbsEditor from 'components/qnabbs/QnaBbsEditor';
import storage from 'lib/storage';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
class QnaBbsAnswerContainer extends Component {

    state = {
        isAdminUpdate: false
    };

    handleWriteAnswer = async () => {
        const { QnaBbsActions, title, content, history } = this.props;
        const { location } = this.props;
        const { id } = queryString.parse(location.search);
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            let contentText = content;
            contentText = contentText.replace(/\r?\n/g, '<br />');
            await QnaBbsActions.writeAnswer({id, title, content: contentText}, config);
            alert("답변이 게시되었습니다!");
            history.push("/qna");
        } catch(e) {
            console.log(e);
        }
    }
    
    initialize = () => {
        const { QnaBbsActions, location } = this.props;
        QnaBbsActions.initialize();
        const { id, update } = queryString.parse(location.search);
        if(id && update !== "false") {
            this.setState({
                isAdminUpdate: true
            });
            this.getAnswer();
        }
    }

    getAnswer = async () => {
        const { QnaBbsActions, location } = this.props;
        const { id } = queryString.parse(location.search);
        const config = {
            headers: { Pragma: 'no-cache'}
          };
        try {
            await QnaBbsActions.getQnaById({id}, config);
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.initialize();
    }

    handleChange = ({name, value}) => {
        const { QnaBbsActions } = this.props;
        QnaBbsActions.changeInput({name, value});
    }

    updateAnswer = async () => {
        const { QnaBbsActions, location, title, content, history } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        const { id } = queryString.parse(location.search);

        try {
            await QnaBbsActions.updateAnswer({id, title, content}, config);
            alert("답변이 수정되었습니다!");
            history.push("/qna");
        } catch(e) {
            console.log(e);
        }
    }

 render() {
    const { handleWriteAnswer, handleChange, updateAnswer } = this;
    const {title, content, adminLogged} = this.props;
    const { isAdminUpdate } = this.state;
   return (
    <QnaBbsEditorTemplate>
        <QnaBbsEditor 
            adminLogged={adminLogged} 
            isAdminUpdate={isAdminUpdate} 
            onWrite={handleWriteAnswer} 
            title={title} 
            content={content} 
            onChangeInput={handleChange}
            onUpdateAnswer={updateAnswer}/>
    </QnaBbsEditorTemplate>
   );
 }
}

export default connect(
  (state) => ({
    title: state.qnabbs.get('title'),
    content: state.qnabbs.get('content'),
    adminLogged: state.base.get('adminLogged')
  }),
  (dispatch) => ({
      QnaBbsActions: bindActionCreators(qnaBbsActions, dispatch)
  })
)(withRouter(QnaBbsAnswerContainer));