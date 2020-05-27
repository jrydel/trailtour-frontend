import React from 'react';

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history'
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

    const history = createBrowserHistory();
    history.listen(location => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    })
    React.useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [history])

    return (
        <Router history={history}>
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
        </Router >
    );
}

export default Layout;