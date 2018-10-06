import React from 'react';
import PageTemplate from 'components/common/PageTemplate';

import CategoryContainer from 'containers/Category/CategoryContainer';

const CategoryPage = ({match}) => {
    const { category } = match.params;
    return (
        <PageTemplate>
            <CategoryContainer category={category} />
        </PageTemplate>
    );
};

export default CategoryPage;