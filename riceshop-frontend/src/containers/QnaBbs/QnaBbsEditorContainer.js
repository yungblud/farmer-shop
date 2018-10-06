import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QnaBbsEditorTemplate from 'components/qnabbs/QnaBbsEditorTemplate';
import QnaBbsEditor from 'components/qnabbs/QnaBbsEditor';
import * as qnaBbsActions from 'store/modules/qnabbs';
import * as baseActions from 'store/modules/base';
import { withRouter } from 'react-router-dom';
import storage from 'lib/storage';
import queryString from 'query-string';

class QnaBbsEditorContainer extends Component {

    state = {
        isUpdate: false
    };

    handleWriteQna = async () => {
        const { QnaBbsActions, title, content, history } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };

        

        try {
            
            let contentText = content;
            contentText = contentText.replace(/\r?\n/g, '<br />');
            await QnaBbsActions.writeQna({title, content: contentText, username: storage.get('loggedInfo').userID}, config);
            alert("질문이 게시되었습니다!");
            history.push("/qna");
        } catch(e) {
            console.log(e);
        }
    }

    handleChange = ({name, value}) => {
        const { QnaBbsActions } = this.props;
        QnaBbsActions.changeInput({name, value});
    }



    initialize = () => {
        const { QnaBbsActions, location } = this.props;
        QnaBbsActions.initialize();
        const { id } = queryString.parse(location.search);
        if(id) {
            this.setState({
                isUpdate: true
            });
            this.getQnaById();
        }
    }

    getQnaById = async () => {
        const { QnaBbsActions, location } = this.props;
        const { id } = queryString.parse(location.search);
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        await QnaBbsActions.getQnaById({id}, config);
    }
   
    updateQna = async () => {
        const { QnaBbsActions, location, title, content, history } = this.props;
        const { id } = queryString.parse(location.search);
        const config = {
            headers: { Pragma: 'no-cache'}
        };

        if(content.trim().length === 0 || content.trim() === "" || 
        title.trim().length === 0 || title.trim() === "") {
            alert("내용과 제목을 입력해주세요!");
            return;
        }

        try {
            await QnaBbsActions.updateQnaBbs({id, title, content}, config);
            alert("수정 되었습니다!");
            history.push(`/qna/detail/${id}`);
        } catch(e) {
            console.log(e);
        }
    }
      
    componentDidMount() {
        const { history } = this.props;
        const loggedInfo = storage.get('loggedInfo');
        if(!loggedInfo) {
            alert("로그인 하셔야 질문을 올릴수 있습니다.");
            history.push("/login");
        }
        this.initialize();
    }

    showPasswordModal = () => {
        const { QnaBbsActions, title, content } = this.props;
        if(content.trim().length === 0 || content.trim() === "" || 
        title.trim().length === 0 || title.trim() === "") {
            alert("내용과 제목을 입력해주세요!");
            return;
        }
        QnaBbsActions.showPasswordModal();
    }

 render() {
     const { handleChange, handleWriteQna, updateQna, showPasswordModal } = this;
     const {title, content} = this.props;
     const { isUpdate } = this.state;
   return (
    <QnaBbsEditorTemplate>
        <QnaBbsEditor 
            isUpdate={isUpdate} 
            onWrite={handleWriteQna} 
            onUpdate={updateQna} 
            title={title} 
            content={content} 
            onChangeInput={handleChange}
            showModal={showPasswordModal}/>
    </QnaBbsEditorTemplate>
   );
 }
}

export default connect(
  (state) => ({
      title: state.qnabbs.get('title'),
      content: state.qnabbs.get('content')
  }),
  (dispatch) => ({
      QnaBbsActions: bindActionCreators(qnaBbsActions, dispatch)
  })
)(withRouter(QnaBbsEditorContainer));