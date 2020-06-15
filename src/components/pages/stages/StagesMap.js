import React from "react";

import useSWR from "swr";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import FullscreenControl from "react-leaflet-fullscreen";

import { defaultGetOptions, fetcher } from "../../utils/FetchUtils";
import { PageLoading, PageError, PageBox } from "../layout/Page";
import { useNavigate } from "react-router-dom";
import { AppLink } from "../../utils/NavUtils";
import { formatStageNumber } from "../../utils/FormatUtils";

const StageMap = props => {

    const navigate = useNavigate();
    const { data, error } = useSWR("https://api.orank.cz/trailtour/getStagesData?database=trailtour_cz", url => fetcher(url, defaultGetOptions));

    if (error) {
        return <PageError />
    }
    if (!data) return <PageLoading />

    return (
        <PageBox>
            <Map
                className="map"
                center={[49.8037633, 15.4749126]}
                zoom={8}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data.map((stage, key) => {
                    const data = JSON.parse(stage.stravaData).latlng;
                    return (
                        <>
                            <Marker
                                key={key}
                                position={data[0]}
                            >
                                <Popup>
                                    <AppLink to={`/etapa/${stage.number}`} >{formatStageNumber(stage.number) + " - " + stage.name}</AppLink>
                                </Popup>
                            </Marker>
                            <Polyline positions={data} color="red" />
                        </>
                    )
                })}
                <FullscreenControl position="topleft" content={"full"} />
            </Map >
        </PageBox >
    )
}

export default StageMap;