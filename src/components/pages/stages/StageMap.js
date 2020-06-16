import React from "react";

import useSWR from "swr";
import { useParams } from "react-router";
import { Map, TileLayer, Polyline, Marker } from "react-leaflet";
import FullscreenControl from "react-leaflet-fullscreen";

import { defaultGetOptions, fetcher, API_URL } from "../../utils/FetchUtils";
import { PageLoading, PageError, PageBox } from "../layout/Page";
import { icon } from "../../utils/MapUtils";

const StageMap = () => {

    const { number } = useParams();
    const { data, error } = useSWR(`${API_URL}/getStageStravaData?database=trailtour_cz&number=${number}`, url => fetcher(url, defaultGetOptions));

    if (error) {
        return <PageError full={false} />
    }
    if (!data) return <PageLoading full={false} />

    return (
        <PageBox>
            <Map
                className="map"
                center={data.latlng[0]}
                bounds={data.latlng}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={data.latlng[0]} icon={icon("green")} />
                <Marker position={data.latlng[data.latlng.length - 1]} icon={icon("red")} />
                <Polyline positions={data.latlng} color="red" />
                <FullscreenControl position="topleft" content={"full"} />
            </Map >
        </PageBox >
    )
}

export default StageMap;