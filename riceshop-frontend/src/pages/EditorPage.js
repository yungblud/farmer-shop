import React from 'react';
import EditorContainer from 'containers/Editor/EditorContainer';
import AdminPageTemplate from 'components/admin/AdminPageTemplate';
const EditorPage = () => {

    return (
        <AdminPageTemplate>
            <EditorContainer/>
        </AdminPageTemplate>
    );
};

export default EditorPage;