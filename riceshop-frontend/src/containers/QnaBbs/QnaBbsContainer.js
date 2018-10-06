import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QnaBbsWrapper from 'components/qnabbs/QnaBbsWrapper';
import QnaBbsTable from 'components/qnabbs/QnaBbsTable/QnaBbsTable';
import Pagination from 'components/qnabbs/Pagination';
import * as qnaBbsActions from 'store/modules/qnabbs';
import Spinner from 'components/common/Spinner';
import { withRouter } from 'react-router-dom';


class QnaBbsContainer extends Component {

    getQnaList = async () => {
        const { QnaBbsActions, page } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            await QnaBbsActions.getQnaList({page}, config);
        } catch(e) {
            console.log(e);
        }
    }
    getQnaListWithAnswers = async () => {
        const { QnaBbsActions, page } = this.props;
        if(isNaN(parseInt(page, 10)) || page < 1) {
            alert("이상한 접근이네요,,");
            this.props.history.push('/qna');
            return;
        }
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            await QnaBbsActions.getQnaListWithAnswers({page}, config);
            if(this.props.lastPage < page) {
                alert("이상한 접근이네요,,");
                this.props.history.push('/qna');
                return;
            }
        } catch(e) {
            console.log(e);
        }
    }

    
    handleKeyDown = (e) => {
        const { passwordModalInTableVisible, QnaBbsActions } = this.props;
        if(e.keyCode === 27 || e.key === "Escape" || e.key === "Esc" ) {
            if(passwordModalInTableVisible) {
                QnaBbsActions.hidePasswordModalInTable();
            }
        }
    }

    componentDidMount() {
        
        // this.getQnaList();
        this.getQnaListWithAnswers();
        document.body.addEventListener("keydown", this.handleKeyDown);
    }



    componentDidUpdate(prevProps, prevState) {
        if(prevProps.page !== this.props.page) {
            this.getQnaListWithAnswers();
            document.documentElement.scrollTop = 0; 
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.handleKeyDown);
    }

    handleSearch = async ({value}) => {
        const { QnaBbsActions, searchword, searchFilter } = this.props;

        try {
            await QnaBbsActions.search({value: searchword, filter: searchFilter});
        } catch(e) {
            console.log(e);
        }
    }

    handleSearchKeyDown = (e) => {
        const { searchword } = this.props;
        if(e.key === "Enter") {
            this.handleSearch({value: searchword});
        }
    }

    handleChangeSelect = ({value}) => {
        const { QnaBbsActions } = this.props;
        QnaBbsActions.onChangeSelect({filter: value});
    }

    handleChangeInput = ({name, value}) => {
        const { QnaBbsActions } = this.props;
        QnaBbsActions.changeInput({name, value});
    }

    showPasswordModal = (e) => {
        const { QnaBbsActions, history } = this.props;
        const { id } = e.target;
        if(this.props.adminLogged) {
            return history.push(`/qna/detail/${id}`);
        }
        QnaBbsActions.showPasswordModalInTable();
        QnaBbsActions.setQnaId({qnaId: id});
    }


   
 render() {
     const { page, lastPage, qnaList, loading, adminLogged, searchword, isSearched, searchedList } = this.props;
     const { handleChangeInput, showPasswordModal, handleChangeSelect, handleSearch, handleSearchKeyDown } = this;
    //  if(qnaList.size === 0) return null;
   return (
    <QnaBbsWrapper 
        word={searchword} 
        onChangeInput={handleChangeInput} 
        handleChangeSelectFilter={handleChangeSelect}
        onSearch={handleSearch}
        onSearchKeydown={handleSearchKeyDown}>
        <QnaBbsTable isSearched={isSearched} searchedList={searchedList} list={qnaList} showModal={showPasswordModal}/>
        <Pagination page={page} lastPage={lastPage}/>
        <Spinner visible={loading}/>
    </QnaBbsWrapper>
   );
 }
}

export default connect(
  (state) => ({
      qna: state.qnabbs.get('qna'),
      qnaList: state.qnabbs.get('qnaList'),
      lastPage: state.qnabbs.get('lastPage'),
      loading: state.pender.pending['qnabbs/GET_QNA_LIST_WITH_ANSWERS'],
      adminLogged: state.base.get('adminLogged'),
      searchword: state.qnabbs.get('searchword'),
      adminLogged: state.base.get('adminLogged'),
      passwordModalInTableVisible: state.qnabbs.get('passwordModalInTableVisible'),
      searchFilter: state.qnabbs.get('searchFilter'),
      isSearched: state.qnabbs.get('isSearched'),
      searchedList: state.qnabbs.get('searchedList')
  }),
  (dispatch) => ({
      QnaBbsActions: bindActionCreators(qnaBbsActions, dispatch)
  })
)(withRouter(QnaBbsContainer));