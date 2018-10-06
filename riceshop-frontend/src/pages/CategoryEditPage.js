import React from 'react';
import AdminPageTemplate from 'components/admin/AdminPageTemplate';
import CategoryEditContainer from 'containers/Category/CategoryEditContainer';
import CategoryModalContainer from 'containers/Modal/CategoryModalContainer';

const CategoryEditPage = () => {
    return (
        <AdminPageTemplate>
            <CategoryEditContainer />
            <CategoryModalContainer />
        </AdminPageTemplate>
    );
};

export default CategoryEditPage;