import React from "react";

import useSWR from "swr";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import FullscreenControl from "react-leaflet-fullscreen";

import { defaultGetOptions, fetcher, API_URL } from "../../utils/FetchUtils";
import { PageLoading, PageError, PageBox } from "../layout/Page";
import { AppLink } from "../../utils/NavUtils";
import { formatStageNumber, formatSeconds } from "../../utils/FormatUtils";
import StravaKomIcon from "../../../assets//images/strava-kom.png";
import { formatTime } from "../../utils/FormatUtils";

const StagesMap = () => {

    const { data: stageData, error: stageError } = useSWR(`${API_URL}/getStagesData?database=trailtour_cz`, url => fetcher(url, defaultGetOptions));
    const { data: komData, error: komError } = useSWR(`${API_URL}/getKomResults?database=trailtour_cz`, url => fetcher(url, defaultGetOptions));

    if (stageError || komError) {
        return <PageError full={false} />
    }
    if (!stageData || !komData) return <PageLoading full={false} />

    let bounds = [];
    stageData.map(stage => {
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
                {stageData.map((stage, key) => {
                    const data = JSON.parse(stage.stravaData).latlng;
                    const male = komData[stage.number].M;
                    const female = komData[stage.number].F;
                    return (
                        <div key={key}>
                            <Marker position={data[0]} >
                                <Popup className="">
                                    <div className="flex flex-col p-2 items-start justify-center">
                                        <div className="mb-2">
                                            <AppLink to={`/etapa/${stage.number}`} >{formatStageNumber(stage.number) + " - " + stage.name}</AppLink>
                                        </div>
                                        {
                                            male && (
                                                <div className="mb-2 flex flex-row items-center justify-start">
                                                    <div className="tooltip">
                                                        <img src={StravaKomIcon} className="w-5" />
                                                        <span className="tooltip-text bg-dark text-light text-xs rounded py-1 px-4 ml-6 -mt-4">Nejrychlejší muž</span>
                                                    </div>
                                                    <div className="ml-2 flex flex-row">
                                                        <span className="mr-2">{formatSeconds(male.activityTime)}</span>
                                                        <AppLink to={`/zavodnik/${male.athleteId}`}>{male.athleteName}</AppLink>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            female && (
                                                <div className="flex flex-row items-center justify-start">
                                                    <div className="tooltip">
                                                        <img src={StravaKomIcon} className="w-5" />
                                                        <span className="tooltip-text bg-dark text-light text-xs rounded py-1 px-4 ml-6 -mt-4">Nejrychlejší muž</span>
                                                    </div>
                                                    <div className="ml-2 flex flex-row">
                                                        <span className="mr-2">{formatSeconds(female.activityTime)}</span>
                                                        <AppLink to={`/zavodnik/${female.athleteId}`}>{female.athleteName}</AppLink>
                                                    </div>
                                                </div>
                                            )
                                        }
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