import React from "react";

import { Route, Redirect, NavLink, Link as RouterLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, Link, List } from "@material-ui/core";
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import MapIcon from '@material-ui/icons/Map';
import UpdateIcon from '@material-ui/icons/Update';


import FeedPage from "./feed/FeedPage";
import StagesPage from "./stages/StagesPage";
import StagePage from "./stage/StagePage";
import NoMatch from "./NoMatch";
import Athletepage from "./athlete/AthletePage";
import StagesMap from "./stages/StagesMap";
import ChangelogPage from "./ChangelogPage";
import StageInfo from "./stages/StageInfo";

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
    // etapy
    {
        menu: {
            name: "Etapy",
            icon: <FormatListNumbered />
        },
        route: {
            path: "/etapy",
            exact: true,
            component: StagesPage,
        }
    },
    {
        route: {
            path: "/mapa",
            exact: true,
            component: StagesMap,
        },
        menu: {
            name: "Mapa",
            icon: <MapIcon />
        }
    },
    {
        route: {
            path: "/etapy/:country/:number",
            exact: true,
            component: StagePage,
        }
    },
    {
        route: {
            path: "/etapy/:country/:number/info",
            component: StageInfo,
        }
    },
    // zavodnici
    {
        route: {
            path: "/zavodnik/:country/:id",
            component: Athletepage
        }
    },
    // ostatni
    {
        route: {
            path: "/changelog",
            component: ChangelogPage
        },
        menu: {
            name: "Changelog",
            icon: <UpdateIcon />
        }
    },
    {
        route: {
            component: NoMatch
        }
    }
]

export const routes = authenticated => navigation.map((nav, key) => <PrivateRoute {...nav.route} key={key} authenticated={authenticated} />);
export const menuItems = toggleMenu => (<List component="nav">{navigation.filter(nav => nav.menu).map((nav, key) => renderMenuItem(nav, key, toggleMenu))}</List>);

export const renderMenuItem = (item, key, toggleMenu) => (
    <ListItem key={key} button component={NavLink} exact={item.route.exact} activeClassName="Mui-selected" to={item.route.path} onClick={toggleMenu}>
        <ListItemIcon>{item.menu.icon}</ListItemIcon>
        <ListItemText primary={item.menu.name} />
    </ListItem >
);

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