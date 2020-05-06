import React from "react";

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import { menuItems } from "./Navigation";

export const sidebarWidth = 200;

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up("lg")]: {
            width: sidebarWidth
        }
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
        width: sidebarWidth
    }
}));

const Sidebar = props => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Hidden lgUp>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={props.open}
                    onClose={props.toggleMenu}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawer}>
                        <div className={classes.toolbar} />
                        <Divider />
                        <List>
                            {menuItems(props.toggleMenu)}
                        </List>
                    </div>
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    variant="permanent"
                    anchor="left"
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawer}>
                        <div className={classes.toolbar} />
                        <Divider />
                        <List>
                            {menuItems()}
                        </List>
                    </div>
                </Drawer>
            </Hidden>
        </div>
    );
}

export default Sidebar;