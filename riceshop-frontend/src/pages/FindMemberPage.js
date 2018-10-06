import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import FindUserContainer from 'containers/Member/FindUserContainer';

const FindMemberPage = () => {
    return (
        <PageTemplate>
            <FindUserContainer />
        </PageTemplate>
    );
};

export default FindMemberPage;