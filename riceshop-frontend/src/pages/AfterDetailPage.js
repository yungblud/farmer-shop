import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import AfterDetailContainer from 'containers/Post/AfterDetailContainer';

const AfterDetailPage = ({match}) => {
    const { itemId, afterId } = match.params;
    return (
        <PageTemplate>
            <AfterDetailContainer itemId={itemId} afterId={afterId}/>
        </PageTemplate>
    );
};

export default AfterDetailPage;