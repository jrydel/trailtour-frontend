import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { SnackbarProvider } from 'notistack';

import Header from '../components/Header';
import LoginPage from './LoginPage.js';
import { UserContext } from "../AppContext";
import Sidebar from './Sidebar';

import { routes } from "./Navigation";

const Layout = () => {

    const { session } = React.useContext(UserContext);

    const notistackRef = React.createRef();
    const onClickDismiss = key => () => {
        notistackRef.current.closeSnackbar(key);
    }

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const toggleMenu = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Router>
            <Switch>
                <Route path="/login" render={({ location }) => session.login ? <Redirect to={{ pathname: "/", state: { from: location } }} /> : <LoginPage />} />
                <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center", }} autoHideDuration={3000} ref={notistackRef} hideIconVariant={true}
                    action={key => <CloseIcon onClick={onClickDismiss(key)} />}>
                    <Box display="flex">
                        <Header toggleMenu={toggleMenu} />
                        <Sidebar open={mobileOpen} toggleMenu={toggleMenu} />
                        <Switch>
                            {routes(session.login)}
                        </Switch>
                    </Box>
                </SnackbarProvider>
            </Switch>
        </Router >
    );
}

export default Layout;