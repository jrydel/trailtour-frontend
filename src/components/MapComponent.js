import React from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Box } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';


import { formatNumber, formatStageNumber } from "./utils/FormatUtils";
import { AppLink } from "./Navigation";


const MapComponent = props => {

    return (
        <Map
            style={{ width: props.viewport.width, height: props.viewport.height }}
            center={props.viewport.center}
            zoom={props.viewport.zoom}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {
                props.data.map((marker, key) =>
                    <Marker key={key} position={[marker.latitude, marker.longitude]} >
                        <Popup>
                            <Box display="flex" flexDirection="column" >
                                <AppLink to={"/etapy/" + marker.country.toLowerCase() + "/" + marker.number}> {formatStageNumber(marker.number) + " - " + marker.name}</AppLink>
                                <Box display="flex" flexDirection="row" alignItems="center" style={{ marginTop: 10 }}>
                                    <ArrowForwardIcon fontSize="small" />{marker.distance.toLocaleString("cz")} m
                                    <div style={{ marginLeft: 5 }} />
                                    <ArrowUpwardIcon fontSize="small" />{marker.elevation.toLocaleString("cz")} m
                                    <div style={{ marginLeft: 5 }} />
                                    <DirectionsRunIcon fontSize="small" />{formatNumber(marker.activities)}
                                </Box>
                            </Box>
                        </Popup>
                    </Marker>
                )
            }
        </Map >
    );
}

export default MapComponent;