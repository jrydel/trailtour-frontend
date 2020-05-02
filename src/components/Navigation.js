import React from "react";

import { Route, Redirect, NavLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import AdbIcon from '@material-ui/icons/Adb';

import StagesPage from "./stages/StagesPage";
import StagePage from "./stage/StagePage";
import NoMatch from "./NoMatch";

const navigation = [
    {
        route: {
            path: "/etapy",
            component: StagesPage,
        },
        menu: {
            name: "Etapy",
            icon: <FormatListNumbered />
        }
    },
    {
        route: {
            path: "/etapa/:id",
            component: StagePage,
        }
    },
    {
        route: {
            path: "/adsf",
            component: NoMatch
        },
        menu: {
            name: "test",
            icon: <AdbIcon />
        }
    }
]

export const routes = authenticated => navigation.map((nav, key) => <PrivateRoute {...nav.route} key={key} authenticated={authenticated} />);

export const menuItems = toggleMenu => navigation.filter(nav => nav.menu).map((nav, key) => (
    <ListItem key={key} button component={NavLink} activeClassName="Mui-selected" to={nav.route.path} onClick={toggleMenu}>
        <ListItemIcon>{nav.menu.icon}</ListItemIcon>
        <ListItemText primary={nav.menu.name} />
    </ListItem>
));

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