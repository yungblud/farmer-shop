import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListContainer from 'containers/List/ListContainer';
import { Helmet } from 'react-helmet';


const ListPage = (props) => {
    const title = (() => {
        let title = '쌀 쇼핑몰';

        return title;
      })();
    
    return (
        <PageTemplate>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <ListContainer/>
        </PageTemplate>
    );
};

export default ListPage;