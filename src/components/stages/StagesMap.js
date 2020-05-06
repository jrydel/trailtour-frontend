import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { AppLink } from '../Navigation';

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import LayoutPageSimple from '../LayoutPageSimple';
import { defaultGetOptions, API_URL, useFetch, loading } from '../utils/FetchUtils';
import { useSnackbar } from 'notistack';

const StagesMap = props => {

    // snackbar
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    const apiDataCZ = useFetch(
        API_URL + "/getStagesData?database=trailtour_cz",
        defaultGetOptions,
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );
    const pageLoading = loading(apiDataCZ);

    const CustomMarker = props => (
        <Marker position={[49.8037633, 15.4749126]} >
            <Popup>
                <Box display="flex" flexDirection="column" >
                    <AppLink to={"/"}>Testovací etapa</AppLink>
                    <Box display="flex" flexDirection="row" alignItems="center" style={{ marginTop: 10 }}>
                        <ArrowForwardIcon fontSize="small" />
                        <div style={{ marginLeft: 5 }} />
                        <ArrowUpwardIcon fontSize="small" />
                        <div style={{ marginLeft: 5 }} />
                        <DirectionsRunIcon fontSize="small" />

                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Work" secondary="Jan 7, 2014" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BeachAccessIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Popup>
        </Marker>
    );

    return (
        <LayoutPageSimple
            pageLoading={pageLoading}
            pageContent={
                <Map
                    style={{ width: "auto", height: "100%" }}
                    center={[49.8037633, 15.4749126]}
                    zoom={7}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <CustomMarker />
                </Map >
            } />
    )
}

export default StagesMap;