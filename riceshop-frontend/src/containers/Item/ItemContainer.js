import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ItemWrapper from "components/item/ItemWrapper";
import Item from "components/item/Item";
import * as postActions from "store/modules/post";
import * as categoryActions from "store/modules/category";
import Spinner from "components/common/Spinner";
import { withRouter } from "react-router-dom";
import CarouselWrapper from "components/item/CarouselWrapper";
import Carousel from "components/item/Carousel";

class ItemContainer extends Component {
  state = {
    loadingInitial: true,
    categoryItemList: []
  };

  getItemList = async () => {
    const { PostActions, existingCategories, CategoryActions } = this.props;
    const config = {
      headers: { Pragma: "no-cache" }
    };
    try {
      await PostActions.getPostItemList(config);
      this.props.existingCategories.toJS().forEach(category => {
        this.getItemsByCategoryInitial({ category });
      });
      this.setState({
        loadingInitial: false
      });
    } catch (e) {
      console.log(e);
    }
  };

  getItemsByCategoryInitial = async ({ category }) => {
    const { CategoryActions } = this.props;

    try {
      await CategoryActions.getItemsByCategoryInitial({ category });
      this.setState({
        categoryItemList: [
          ...this.state.categoryItemList,
          this.props.items.toJS()
        ]
      });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getItemList();
    // this.getItemsByCategory({category: 'herb'});
  }

  render() {
    const { postItemList, loading } = this.props;
    return (
      <React.Fragment>
        <CarouselWrapper>
          <Carousel />
        </CarouselWrapper>
        <ItemWrapper title={'새로나온 농작물'}>
          <Item postItemList={postItemList} />
          <Spinner visible={loading} />
        </ItemWrapper>
        {!this.state.loadingInitial &&
          this.state.categoryItemList.map((list, i) => {
            let title = this.props.categories.toJS().filter(category => {
              return category.keyname === list[0].category
            });
            return (
              <ItemWrapper title={title[0].title} keyname={list[0].category} key={i}>
                <Item postItemList={list} />
              </ItemWrapper>
            );
          })}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    postItemList: state.post.get("postItemList"),
    loading: state.pender.pending["post/GET_POST_ITEM_LIST"],
    existingCategories: state.post.get("existingCategories"),
    items: state.category.get("items"),
    categories: state.category.get('categories')
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch),
    CategoryActions: bindActionCreators(categoryActions, dispatch)
  })
)(withRouter(ItemContainer));
