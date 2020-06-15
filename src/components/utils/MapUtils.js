import React from "react";

import { Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

export const CustomMarker = props => (
    <>
        <Marker position={props.position} >
            <Popup>
            </Popup>
        </Marker>
        <Polyline positions={props.data} color="red" />
    </>
);

export const CustomGreenMarker = props => (
    <Marker position={props.position} style={{ backgroud: "#16D65A" }} >
        <Popup>
        </Popup>
    </Marker>
)

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