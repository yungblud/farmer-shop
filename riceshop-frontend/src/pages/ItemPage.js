import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ItemContainer from 'containers/Item/ItemContainer';
// import { bindActionCreators } from 'redux';
// import * as postActions from "store/modules/post";
// import * as categoryActions from "store/modules/category";

const ItemPage = () => {
    return (
        <PageTemplate>
            <ItemContainer/>
        </PageTemplate>
    );
};

// const preload1 = (dispatch, params) => {
//     const PostActions = bindActionCreators(postActions, dispatch);
//     const config = {
//         headers: { Pragma: 'no-cache'}
//     };
//     return PostActions.getPostItemList(config)
// }

// const preload2 = (dispatch, params) => {
//     const CategoryActions = bindActionCreators(categoryActions, dispatch);
//     return CategoryActions.getAllCategories();
// }

// ItemPage.preload = (dispatch, params) => {
//     return [preload1, preload2];
// }

export default ItemPage;