import React from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

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
                            {marker.number + " - " + marker.name}
                        </Popup>
                    </Marker>
                )
            }
        </Map >
    );
}

export default MapComponent;