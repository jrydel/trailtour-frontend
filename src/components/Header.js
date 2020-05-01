import React from 'react';

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { UserContext } from '../AppContext';
import Cookies from 'universal-cookie';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    }
}));

const Header = () => {
    const { session, setSession } = React.useContext(UserContext);
    const classes = useStyles();

    const logout = () => {
        const cookies = new Cookies();
        cookies.remove("session");
        setSession({ login: false, role: null });
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title} variant="h6">
                    Kamenice Trailtour 2020
                </Typography>
                {session.login && <Button color="inherit" onClick={logout}>Odhlásit</Button>}
            </Toolbar>
        </AppBar>
    );
}

export default Header;