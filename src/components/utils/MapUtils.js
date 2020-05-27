import React from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet';
import { Box } from '@material-ui/core';
import { AppLink } from '../Navigation';

import { formatStageNumber, formatNumber } from '../utils/FormatUtils';

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

import L from 'leaflet';

export const CustomMarker = props => (
    <>
        <Marker position={props.position} >
            <Popup>
                <StageBox stage={props.stage} />
            </Popup>
        </Marker>
        <Polyline positions={props.data} color="red" />
    </>
);

export const CustomGreenMarker = props => (
    <Marker position={props.position} style={{ backgroud: "#16D65A" }} >
        <Popup>
            <StageBox stage={props.stage} />
        </Popup>
    </Marker>
)

export const StageBox = props => (
    <Box display="flex" flexDirection="column" >
        <AppLink to={"/etapy/cz/" + props.stage.number} >{formatStageNumber(props.stage.number) + " - " + props.stage.name}</AppLink>
        <Box display="flex" flexDirection="row" alignItems="center" style={{ marginTop: 10 }}>
            <ArrowForwardIcon fontSize="small" />{props.stage.distance.toLocaleString("cz")} m
            <div style={{ marginLeft: 5 }} />
            <ArrowUpwardIcon fontSize="small" />{props.stage.elevation.toLocaleString("cz")} m
            <div style={{ marginLeft: 5 }} />
            <DirectionsRunIcon fontSize="small" />{formatNumber(props.stage.activities)}
        </Box>
    </Box>
);

export const blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

export const greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})