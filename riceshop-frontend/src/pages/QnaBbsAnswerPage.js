import React from 'react';
import AdminPageTemplate from 'components/admin/AdminPageTemplate/AdminPageTemplate';
import QnaBbsAnswerContainer from 'containers/QnaBbs/QnaBbsAnswerContainer';

const QnaBbsAnswerPage = () => {
    return (
        <AdminPageTemplate>
            <QnaBbsAnswerContainer/>
        </AdminPageTemplate>
    );
};

export default QnaBbsAnswerPage;