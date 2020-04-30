import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Container, Grid, Typography } from '@material-ui/core';

import { SnackbarProvider } from 'notistack';

import Header from '../components/Header';
import LoginPage from './LoginPage.js';
import NoMatch from './NoMatch';
import { UserContext } from "../AppContext";
import StagesPage from './stages/StagesPage';
import StagePage from './stage/StagePage';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

const Layout = () => {
    const { session } = React.useContext(UserContext);

    const privateRoutes = [
        <PrivateRoute path={"/etapy"} component={StagesPage} authenticated={session.login} />,
        <PrivateRoute path={"/etapa/:id"} component={StagePage} authenticated={session.login} />,
        <PrivateRoute component={NoMatch} authenticated={session.login} />
    ]

    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/etapy" />
                <Route path="/login" render={({ location }) => session.login ? <Redirect to={{ pathname: "/", state: { from: location } }} /> : <LoginPage />} />

                <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center", }} autoHideDuration={3000} >
                    <Header />
                    <Grid container direction="row" >
                        <Grid item xs />
                        <Grid item xs={11} md={8} container direction="column">
                            <Grid item xs />
                            <Grid item xs container direction="column" >
                                <Switch>
                                    {privateRoutes}
                                </Switch>
                            </Grid>
                            <Grid item xs />
                        </Grid>
                        <Grid item xs />
                    </Grid>
                </SnackbarProvider>
            </Switch>
        </Router >
    );
}

export default Layout;