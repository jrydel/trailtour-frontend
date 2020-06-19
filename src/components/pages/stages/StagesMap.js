import React from "react";

import useSWR from "swr";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import FullscreenControl from "react-leaflet-fullscreen";

import { defaultGetOptions, fetcher, API_URL } from "../../utils/FetchUtils";
import { PageLoading, PageError, PageBox } from "../layout/Page";
import { AppLink } from "../../utils/NavUtils";
import { formatStageNumber } from "../../utils/FormatUtils";
import StravaKomIcon from "../../../assets//images/strava-kom.png";

const StagesMap = () => {

    const { data, error } = useSWR(`${API_URL}/getStagesData?database=trailtour_cz`, url => fetcher(url, defaultGetOptions));

    if (error) {
        return <PageError />
    }
    if (!data) return <PageLoading full={false} />

    let bounds = [];
    data.map(stage => {
        const temp = JSON.parse(stage.stravaData).latlng;
        bounds = [...bounds, ...temp];
    });

    return (
        <PageBox>
            <Map
                className="map"
                center={[49.8037633, 15.4749126]}
                bounds={bounds}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data.map((stage, key) => {
                    const data = JSON.parse(stage.stravaData).latlng;
                    return (
                        <div key={key}>
                            <Marker position={data[0]} >
                                <Popup className="">
                                    <div className="flex flex-col p-2 items-start justify-center">
                                        <div className="mb-2">
                                            <AppLink to={`/etapa/${stage.number}`} >{formatStageNumber(stage.number) + " - " + stage.name}</AppLink>
                                        </div>
                                        <div className="mb-2 flex flex-row items-center justify-start">
                                            <div class="tooltip">
                                                <img src={StravaKomIcon} className="w-5" />
                                                <span className="tooltip-text bg-dark text-light text-xs rounded py-1 px-4 ml-6 -mt-4">Nejrychlejší muž</span>
                                            </div>
                                            <span className="ml-2">--:--:-- (Miloš Nykodým)</span>
                                        </div>
                                        <div className="flex flex-row items-center justify-start">
                                            <div class="tooltip">
                                                <img src={StravaKomIcon} className="w-5" />
                                                <span className="tooltip-text bg-dark text-light text-xs rounded py-1 px-4 ml-6 -mt-4">Nejrychlejší žena</span>
                                            </div>
                                            <span className="ml-2">--:--:-- (Miloš Nykodým)</span>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                            <Polyline positions={data} color="red" />
                        </div>
                    )
                })}
                <FullscreenControl position="topleft" content={"full"} />
            </Map >
        </PageBox >
    )
}

export default StagesMap;