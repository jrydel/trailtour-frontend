import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';

import { SnackbarProvider } from 'notistack';

import Header from '../components/Header';
import LoginPage from './LoginPage';
import NoMatch from './NoMatch';
import { UserContext } from "../AppContext";
import SegmentsPage from './segment/SegmentsPage';
import SegmentPage from './segment/SegmentPage';
import AthletesPage from './athlete/AthletesPage';

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
        <PrivateRoute path={"/segmenty"} component={SegmentsPage} authenticated={session.login} />,
        <PrivateRoute path={"/zavodnici"} component={AthletesPage} authenticated={session.login} />,
        <PrivateRoute path={"/segment/:id"} component={SegmentPage} authenticated={session.login} />,
        <PrivateRoute component={NoMatch} authenticated={session.login} />
    ]

    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/segmenty" />
                <Route path="/login" render={({ location }) => session.login ? <Redirect to={{ pathname: "/", state: { from: location } }} /> : <LoginPage />} />

                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    autoHideDuration={3000}
                >
                    <Grid container direction="row">
                        <Grid item xs={12} >
                            <Header />
                        </Grid>
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={2} />
                            <Grid item xs={8} container direction="column" spacing={5} >
                                <Grid item />
                                <Switch>
                                    {privateRoutes}
                                </Switch>
                            </Grid>
                            <Grid item xs={2} />
                        </Grid>
                    </Grid>
                </SnackbarProvider>
            </Switch>
        </Router >
    );
}

export default Layout;