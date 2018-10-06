import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as baseActions from 'store/modules/base'; 
import * as categoryActions from 'store/modules/category'; 
import CategoryModal from 'components/modal/CategoryModal/CategoryModal';
import { bindActionCreators } from 'redux';

class CategoryModalContainer extends Component {

    hideModal = () => {
        const { BaseActions } = this.props;
        BaseActions.hideModal('category');
    }

    handleChange = (e) => {
        const { CategoryActions } = this.props;
        CategoryActions.changeInput({name: e.target.name, value: e.target.value});
    }

    handleCreate = async () => {
        const { CategoryActions } = this.props;
        const { title, keyname } = this.props.input.toJS();
        try {
            await CategoryActions.createCategory({title, keyname});
            window.location.reload();
        } catch(e) {
            console.log(e);
        }
    }

    handleUpdate = async () => {
        const { CategoryActions, id } = this.props;
        const { title, keyname } = this.props.input.toJS();
        try {
            await CategoryActions.updateCategory({id, title, keyname});
            window.location.reload();
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { visible, version } = this.props;
        const { hideModal, handleChange, handleCreate, handleUpdate } = this;
        const { title, keyname } = this.props.input.toJS();
        return (
            <CategoryModal 
                version={version}
                visible={visible}
                hideModal={hideModal}
                onChangeInput={handleChange}
                title={title}
                keyname={keyname}
                onCreate={handleCreate}
                onUpdate={handleUpdate} />
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['modal', 'category']),
        input: state.category.get('input'),
        version: state.category.get('version'),
        id: state.category.get('id')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        CategoryActions: bindActionCreators(categoryActions, dispatch),
        
    })
)(CategoryModalContainer);