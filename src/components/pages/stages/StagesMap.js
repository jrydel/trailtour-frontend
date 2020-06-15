import React from "react";

import { Map, TileLayer } from "react-leaflet";
import useSWR from "swr";
import { defaultGetOptions, fetcher } from "../../utils/FetchUtils";
import { CustomMarker } from "../../utils/MapUtils";
import { PageLoader } from "../layout/Page";
import { useNavigate } from 'react-router-dom';

const StageMap = props => {

    const navigate = useNavigate();
    const { data, error } = useSWR("https://api.orank.cz/trailtour/getStagesData?database=trailtour_cz", url => fetcher(url, defaultGetOptions));

    if (error) {
        console.log(error);
        return <div>error</div>
    }
    if (!data) return <PageLoader />

    return (
        <Map
            className="map"
            center={[49.8037633, 15.4749126]}
            zoom={8}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.map((stage, key) => {
                const data = JSON.parse(stage.stravaData).latlng;
                return <CustomMarker
                    key={key}
                    position={data[0]}
                    stage={stage}
                    data={data}
                />
            })}
        </Map >
    )
}

export default StageMap;