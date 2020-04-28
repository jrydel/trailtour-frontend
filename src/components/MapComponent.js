import React from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = props => {

    const [viewport, setViewport] = React.useState(props.viewport);
    const [data, setData] = React.useState(props.data);

    React.useEffect(() => {
        setViewport(props.viewport);
    }, [props.viewport]);

    React.useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <Map
            style={{ width: viewport.width, height: viewport.height }}
            center={viewport.center}
            zoom={viewport.zoom}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {
                data.map((marker, key) =>
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