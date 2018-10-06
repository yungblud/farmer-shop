import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import QnaBbsContainer from 'containers/QnaBbs/QnaBbsContainer';
import { bindActionCreators } from 'redux';
import * as qnaBbsActions from 'store/modules/qnabbs';
import QnaBbsPasswordCheckModalContainer from 'containers/Modal/QnaBbsPasswordCheckModalContainer';

const QnABbsPage = ({match}) => {
    const { page = 1 } = match.params;
    return (
        <PageTemplate>
            <QnaBbsContainer
                page={parseInt(page, 10)}/>
            <QnaBbsPasswordCheckModalContainer/>
        </PageTemplate>
    );
};

QnABbsPage.preload = (dispatch, params) => {
    const { page = 1 } = params;
    const QnaBbsActions = bindActionCreators(qnaBbsActions, dispatch);
    const config = {
        headers: { Pragma: 'no-cache'}
    };
    return QnaBbsActions.getQnaList({page}, config);
}

export default QnABbsPage;