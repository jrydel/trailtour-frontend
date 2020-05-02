import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Grid, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { SnackbarProvider } from 'notistack';

import Header from '../components/Header';
import LoginPage from './LoginPage.js';
import { UserContext } from "../AppContext";
import Sidebar from './Sidebar';

import { routes } from "./Navigation";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    offset: theme.mixins.toolbar
}));

const Layout = () => {

    const classes = useStyles();
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
                    action={(key) => (
                        <CloseIcon onClick={onClickDismiss(key)} />
                    )}>
                    <div className={classes.root}>
                        <Header toggleMenu={toggleMenu} />
                        <Sidebar open={mobileOpen} toggleMenu={toggleMenu} />
                        <Grid container direction="row" >
                            <Grid item xs />
                            <Grid item xs={11} md={8} container direction="column">
                                <div className={classes.offset} />
                                <Switch>
                                    {routes(session.login)}
                                </Switch>
                            </Grid>
                            <Grid item xs />
                        </Grid>
                    </div>
                </SnackbarProvider>
            </Switch>
        </Router >
    );
}

export default Layout;