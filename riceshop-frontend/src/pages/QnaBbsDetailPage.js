import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import QnaBbsDetailContainer from 'containers/QnaBbs/QnaBbsDetailContainer';
import { bindActionCreators } from 'redux';
import * as qnaBbsActions from 'store/modules/qnabbs';
const QnaBbsDatailPage = ({match}) => {
    const { id } = match.params;
    return (
        <PageTemplate>
            <QnaBbsDetailContainer id={id}/>
        </PageTemplate>
    );
};

QnaBbsDatailPage.preload = (dispatch, params) => {
    const { id } = params;
    const QnaBbsActions = bindActionCreators(qnaBbsActions, dispatch);
    const config = {
        headers: { Pragma: 'no-cache'}
    };
    return QnaBbsActions.getQnaById({id}, config);
}

export default QnaBbsDatailPage;