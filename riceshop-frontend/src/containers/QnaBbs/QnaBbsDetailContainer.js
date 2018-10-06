import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QnaBbsDetailWrapper from 'components/qnabbs/QnaBbsDetailWrapper';
import QnaBbsDetailTable from 'components/qnabbs/QnaBbsDetailTable';
import * as qnaBbsActions from 'store/modules/qnabbs';
import { withRouter } from 'react-router-dom';
import storage from 'lib/storage';

class QnaBbsDetailContainer extends Component {
    getQnaById = async () => {
        const { QnaBbsActions, id } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            await QnaBbsActions.getQnaById({id}, config);
        } catch(e) {
            console.log(e);
        }
    } 
    
    checkCanAccess = async () => {

        if(!storage.get('loggedInfo')) {
            alert("비 공개 글입니다.");
            window.history.back();
            return;
        }
        
        const { QnaBbsActions, id } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };

        try {
            await QnaBbsActions.checkQnaAuth({id}, config);
            
        } catch(e) {
            console.log(e);
        }

        if(!this.props.canAccess) {
            alert("비 공개 글입니다.");
            window.history.back();
        }
    }

    componentDidMount() {
        if(!storage.get('adminLogged')) {
            this.checkCanAccess();
        } else {
            this.props.QnaBbsActions.authorizeBbs();
        }
        
        this.getQnaById();
    }

    removeQna = async () => {
        const { QnaBbsActions, id, history } = this.props;

        const config = {
            headers: { Pragma: 'no-cache'}
        };

        try {
            await QnaBbsActions.removeQnaBbs({id}, config);
            alert("삭제 되었습니다.");
            history.push("/qna");
        } catch(e) {
            console.log(e);
        }
    }

    removeAnswer = async () => {
        const { QnaBbsActions, id, history } = this.props;

        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            await QnaBbsActions.removeAnswer({id}, config);
            alert("답변이 삭제되었습니다");
            history.push("/qna");
        } catch(e) {
            console.log(e);
        }
    }
    

    goToUpdate = () => {
        const { history, id } = this.props;
        history.push(`/editor/qna?id=${id}`);
    }

    goToUpdateAdmin = () => {
        const { history, id } = this.props;
        history.push(`/editor/qna/admin?id=${id}`);
    }
 render() {
     const { qna, adminLogged, loading } = this.props;
     const { removeQna, goToUpdate, goToUpdateAdmin, removeAnswer } = this;
     if(loading || !this.props.canAccess) return null;
   return (
    <QnaBbsDetailWrapper>
        <QnaBbsDetailTable 
            qna={qna} 
            adminLogged={adminLogged} 
            onRemove={removeQna} 
            onUpdate={goToUpdate} 
            onUpdateAdmin={goToUpdateAdmin}
            onRemoveAdmin={removeAnswer}/>
    </QnaBbsDetailWrapper>
   );
 }
}

export default connect(
  (state) => ({
      qna: state.qnabbs.get('qna'),
      adminLogged: state.base.get('adminLogged'),
      loading: state.pender.pending['qnabbs/GET_QNA_BY_ID'],
      canAccess: state.qnabbs.get('canAccess')
  }),
  (dispatch) => ({
      QnaBbsActions: bindActionCreators(qnaBbsActions, dispatch)
  })
)(withRouter(QnaBbsDetailContainer));