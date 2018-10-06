import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ListWrapper from 'components/list/ListWrapper';
import ListItem from 'components/list/ListItem';

import * as listActions from 'store/modules/list';
import * as postActions from 'store/modules/post';
import Spinner from 'components/common/Spinner';

class ListContainer extends Component {

    lastId = '';

    initializeSearch = () => {
        const { PostActions } = this.props;
        PostActions.initializeSearch();
    }

    getListItem = async () => {
        const { ListActions } = this.props;
        

        try {
            // await ListActions.getListItem({lastId: });
        } catch(e) {
            console.log(e);
        }
    }

    getInitialList = async () => {
        const { ListActions } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };

        try {
            await ListActions.getInitialList(config);

        } catch(e){
            console.log(e);
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.getInitialList();
        this.initializeSearch();
        
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
  
    handleScroll = async (e) => {
        const { clientHeight } = document.body;
        const { innerHeight } = window;

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(clientHeight - innerHeight - scrollTop < 100) {
            const { lastId, ListActions } = this.props;
            if(lastId === '' || this.lastId === lastId) {
                return;
            }
            this.lastId = lastId;
            const config = {
                headers: { Pragma: 'no-cache'}
            };
            await ListActions.getListItem({lastId: lastId}, config);
        }
    }

    searchByTitle = async () => {
        const { PostActions, search } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {
            await PostActions.searchByTitle({title: search}, config);
        } catch(e) {
            console.log(e);
        }

    }

    handleChangeInput = ({name, value}) => {
        const { PostActions } = this.props;
        PostActions.changeInput({name, value});
    }

    handleSearchEnter = (e) => {
        if(e.key === "Enter") {
            this.searchByTitle();
        }
    }
 render() {
     const { itemList, loading, loadingInitial, isSearched, searchedList, search } = this.props;
     const { handleChangeInput, searchByTitle, handleSearchEnter } = this;

   return (
    <ListWrapper search={search} onChangeInput={handleChangeInput} onSearch={searchByTitle} onKeydown={handleSearchEnter}>
        <ListItem itemList={itemList} isSearched={isSearched} searchedList={searchedList}/>
        <Spinner visible={loading || loadingInitial}/>
    </ListWrapper>
   );
 }
}

export default connect(
  (state) => ({
    itemList: state.list.get('itemList'),
    lastId: state.list.get('lastId'),
    loading: state.pender.pending['list/GET_LIST_ITEM'],
    loadingInitial: state.pender.pending['list/GET_INITIAL_LIST'],
    search: state.post.get('search'),
    isSearched: state.post.get('isSearched'),
    searchedList: state.post.get('searchedList')
  }),
  (dispatch) => ({
      ListActions: bindActionCreators(listActions, dispatch),
      PostActions: bindActionCreators(postActions, dispatch)
  })
)(ListContainer);