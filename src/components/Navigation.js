import React from "react";

import { Route, Redirect, NavLink, Link as RouterLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, Link } from "@material-ui/core";
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

import FeedPage from "./feed/FeedPage";
import StagesPage from "./stages/StagesPage";
import StagePage from "./stage/StagePage";
import NoMatch from "./NoMatch";
import Athletepage from "./athlete/AthletePage";

const navigation = [
    {
        route: {
            path: "/",
            exact: true,
            component: FeedPage
        },
        menu: {
            name: "Novinky",
            icon: <NewReleasesIcon />
        }
    },
    {
        route: {
            path: "/etapy",
            exact: true,
            component: StagesPage,
        },
        menu: {
            name: "Etapy",
            icon: <FormatListNumbered />
        }
    },
    {
        route: {
            path: "/etapy/:country/:number",
            component: StagePage,
        }
    },
    {
        route: {
            path: "/zavodnik/:id",
            component: Athletepage
        }
    },
    {
        route: {
            component: NoMatch
        }
    }
]

export const routes = authenticated => navigation.map((nav, key) => <PrivateRoute {...nav.route} key={key} authenticated={authenticated} />);
export const menuItems = toggleMenu => navigation.filter(nav => nav.menu).map((nav, key) => (
    <ListItem key={key} button component={NavLink} exact={nav.route.exact} activeClassName="Mui-selected" to={nav.route.path} onClick={toggleMenu}>
        <ListItemIcon>{nav.menu.icon}</ListItemIcon>
        <ListItemText primary={nav.menu.name} />
    </ListItem>
));

export const AppLink = props => <Link {...props} component={RouterLink}>{props.children}</Link>;
export const ExternalLink = props => <Link {...props} target="_blank" rel="noopener noreferrer">{props.children}</Link>;

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