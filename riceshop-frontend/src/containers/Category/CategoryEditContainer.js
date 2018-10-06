import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as categoryActions from 'store/modules/category';
import * as baseActions from 'store/modules/base';
import { bindActionCreators } from 'redux';
import CategoryEdit from 'components/admin/CategoryEdit/CategoryEdit';


class CategoryEditContainer extends Component {

    componentDidMount() {
        this.getAllCategories();
    }

    getAllCategories = async () => {
        const { CategoryActions } = this.props;

        try {
            await CategoryActions.getAllCategories();
        } catch(e) {
            console.log(e);
        }
    }

    showModal = () => {
        const {BaseActions } = this.props;
        BaseActions.showModal('category');
    }

    setVersionUpdate = () => {
        const { CategoryActions } = this.props;
        CategoryActions.setCategoryVersion('update')
    }
    setVersionCreate = () => {
        const { CategoryActions } = this.props;
        CategoryActions.setCategoryVersion('create');
    }

    setId = ({id}) => {
        const { CategoryActions } = this.props;
        CategoryActions.setId({id});
    }

    handleRemove = async ({id}) => {
        const { CategoryActions } = this.props;

        try {
            await CategoryActions.removeCategory({id});
            window.location.reload();
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { categories } = this.props;
        const { showModal, setVersionUpdate, setVersionCreate, setId, handleRemove } = this;
        return (
            <CategoryEdit 
                categories={categories}
                showModal={showModal}
                onCreate={setVersionCreate}
                onUpdate={setVersionUpdate}
                onSetId={setId}
                onRemove={handleRemove} />
        );
    }
}

export default connect(
    (state) => ({
        categories: state.category.get('categories')
    }),
    (dispatch) => ({
        CategoryActions: bindActionCreators(categoryActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(CategoryEditContainer);