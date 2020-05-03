import React from 'react';

import LayoutPage, { PageTitle } from "./LayoutPage";

const NoMatch = props => {

    return (
        <LayoutPage
            pageTitle={<PageTitle>Nenalezeno</PageTitle>}
        />
    );
}

export default NoMatch;