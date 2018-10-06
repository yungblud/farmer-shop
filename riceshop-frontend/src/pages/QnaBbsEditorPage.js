import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import QnaBbsEditorContainer from 'containers/QnaBbs/QnaBbsEditorContainer';
import QnaBbsSetPasswordModalContainer from 'containers/Modal/QnaBbsSetPasswordModalContainer';
const QnaBbsEditorPage = () => {
    return (
        <PageTemplate>
            <QnaBbsEditorContainer/>
            <QnaBbsSetPasswordModalContainer/>
        </PageTemplate>
    );
};

export default QnaBbsEditorPage;