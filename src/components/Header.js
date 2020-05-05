import React from 'react';

import { AppBar, Toolbar, Typography, Button, IconButton, Hidden, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Cookies from 'universal-cookie';

import { NavLink } from 'react-router-dom';

import { UserContext } from '../AppContext';

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        textDecoration: "none",
        color: "unset",
    }
}));

const Header = props => {
    const { session, setSession } = React.useContext(UserContext);
    const classes = useStyles();

    const logout = () => {
        const cookies = new Cookies();
        cookies.remove("session");
        setSession({ login: false, role: null });
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Hidden lgUp implementation="css">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.toggleMenu}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Typography component={NavLink} to="/" className={classes.title} variant="h6">
                    Kamenice Trailtour 2020
                </Typography>
                <div style={{ flexGrow: 1 }} />
                {session.login && <Button color="inherit" onClick={logout}>Odhlásit</Button>}
            </Toolbar>
        </AppBar>
    );
}

export default Header;