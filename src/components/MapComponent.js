import React from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Link, Box } from "@material-ui/core";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Link to={"/etapa/" + marker.id} >
                                    {marker.number + " - " + marker.name}
                                </Link>
                                <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: 5 }}>
                                    <KeyboardArrowRightIcon fontSize="small" />{marker.distance.toLocaleString("cz")} m
                                    <div style={{ marginLeft: 5 }} />
                                    <KeyboardArrowUpIcon fontSize="small" />{marker.elevation.toLocaleString("cz")} m
                                </Box>
                            </div>
                        </Popup>
                    </Marker>
                )
            }
        </Map >
    );
}

export default MapComponent;