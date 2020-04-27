import React from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = props => {

    const [viewport, setViewport] = React.useState(props.viewport);

    React.useEffect(() => {
        setViewport(props.viewport);
    }, [props.viewport]);

    return (
        <Map
            style={{ width: viewport.width, height: viewport.height }}
            center={viewport.center}
            zoom={viewport.zoom}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {
                props.data.map((marker, key) =>
                    <Marker key={key} position={[marker.latitude, marker.longitude]} >
                        <Popup>
                            {marker.name}
                        </Popup>
                    </Marker>
                )
            }
        </Map >
    );
}

export default MapComponent;