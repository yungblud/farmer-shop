import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as categoryActions from 'store/modules/category';
import { bindActionCreators } from 'redux';
import CategoryWrapper from 'components/category/CategoryWrapper';
import CategoryList from 'components/category/CategoryList';

class CategoryContainer extends Component {

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        this.getItems();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.category !== this.props.category) {
            this.getItems();
        }
    }

    getItems = async () => {
        const { CategoryActions, category } = this.props;

        try {
            await CategoryActions.getItemsByCategory({category});
            
            
        } catch(e){
            console.log(e);
        }
    }

    render() {
        
        const { items, category } = this.props;
        return (
            <CategoryWrapper category={category}>
                <CategoryList items={items} />
            </CategoryWrapper>
        );
    }
}

export default connect(
    (state) => ({
        items: state.category.get('items'),
    }),
    (dispatch) => ({
        CategoryActions: bindActionCreators(categoryActions, dispatch)
    })
)(CategoryContainer);