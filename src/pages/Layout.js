import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Grid, Box, Typography } from '@material-ui/core';

import Header from '../components/Header';
import LoginPage from './LoginPage';
import SegmentsPage from './SegmentsPage';
import NoMatch from './NoMatch';

import { UserContext } from "../AppContext";

const routes = [
    {
        path: "/segmenty",
        pageTitle: "Segmenty",
        pageContent: <SegmentsPage />
    },
    {
        path: "*",
        pageContent: <NoMatch />
    }
]

const PrivateRoute = ({ authenticated, children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authenticated ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

const Layout = () => {
    const { session } = React.useContext(UserContext);

    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/segmenty" />
                <Route path="/login" render={({ location }) => session.login ? <Redirect to={{ pathname: "/", state: { from: location } }} /> : <LoginPage />} />
                <Grid container direction="row">
                    <Grid item xs={12} >
                        <Header />
                    </Grid>
                    <Grid item xs={12} container direction="row">
                        <Grid item xs={2} />
                        <Grid item xs={8} container direction="column" spacing={5} >
                            <Grid item />
                            <Switch>
                                {routes.map((route, key) =>
                                    <PrivateRoute key={key} path={route.path} authenticated={session.login}>
                                        <Grid item>
                                            <Typography variant={"h4"}>{route.pageTitle}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="row" spacing={1}>
                                                {route.pageContent}
                                            </Grid>
                                        </Grid>
                                    </PrivateRoute >
                                )}
                            </Switch>
                        </Grid>
                        <Grid item xs={2} />
                    </Grid>
                </Grid>
            </Switch>
        </Router >
    );
}

export default Layout;