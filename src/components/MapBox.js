import React from "react";

import ReactMapGL, { Marker } from 'react-map-gl';

import Tooltip from '@material-ui/core/Tooltip';
import RoomIcon from '@material-ui/icons/Room';

const MAPBOX_TOKEN = "pk.eyJ1IjoiZ3h4Z3h4Z3h4IiwiYSI6ImNrOWZlcXVsNDA1bzYzZWtjcno0bGUwajUifQ.RhWKet8cAHR6v-lpRWorpw";

const MapBox = (props) => {
    const [viewport, setViewport] = React.useState({ ...props.viewport });

    React.useEffect(() => {
        setViewport(props.viewport);
    }, [props.viewport])

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={MAPBOX_TOKEN}
        >
            {
                props.data.map((marker, key) => {
                    return <Marker key={key} latitude={marker.latitude} longitude={marker.longitude} offsetLeft={-20} offsetTop={-10}>
                        <Tooltip title={marker.name}>
                            <RoomIcon color="primary" fontSize="large" />
                        </Tooltip>
                    </Marker>
                })
            }

        </ReactMapGL >
    );
}

export default MapBox;