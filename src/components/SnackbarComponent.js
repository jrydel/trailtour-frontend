import React from 'react';

import { SnackbarProvider } from 'notistack';

const SnackbarComponent = props => {

    return (
        < SnackbarProvider >
            <MyApp />
        </SnackbarProvider >
    );
}

export default SnackbarComponent;
