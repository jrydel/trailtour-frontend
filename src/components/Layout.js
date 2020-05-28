import React from 'react';

import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

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

    const location = useLocation();
    React.useEffect(() => {
        ReactGA.ga('send', 'pageview', location.pathname);
    }, [location]);

    return (
        <Switch>
            <Route path="/login" render={({ location }) => session.login ? <Redirect to={{ pathname: "/", state: { from: location } }} /> : <LoginPage />} />
            <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center", }} autoHideDuration={3000} ref={notistackRef} hideIconVariant={true}
                action={key => <CloseIcon onClick={onClickDismiss(key)} />}>
                <Box display="flex" flexBasis="row">
                    <Header toggleMenu={toggleMenu} />
                    <Sidebar open={mobileOpen} toggleMenu={toggleMenu} />
                    <Switch>
                        {routes(session.login)}
                    </Switch>
                </Box>
            </SnackbarProvider>
        </Switch>
    );
}

export default Layout;