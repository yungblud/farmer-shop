import React from 'react';
import NotFound from '../components/common/NotFound/NotFound';

const NotFoundPage = ({history, staticContext}) => {
    if (staticContext) {
        staticContext.isNotFound = true;
      }
    return (
        <NotFound onGoBack={history.goBack}/>
    );
};

export default NotFoundPage;