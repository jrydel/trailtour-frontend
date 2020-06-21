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

    const { data: stageData, error: stageError } = useSWR(`${API_URL}/getAllStages?database=trailtour`, url => fetcher(url, defaultGetOptions));
    const { data: stageGPSData, error: stageGPSError } = useSWR(`${API_URL}/getAllStagesGPSData?database=trailtour`, url => fetcher(url, defaultGetOptions));
    const { data: komData, error: komError } = useSWR(`${API_URL}/getKomResults?database=trailtour`, url => fetcher(url, defaultGetOptions));

    if (stageError || stageGPSError || komError) {
        return <PageError full={false} />
    }
    if (!stageData || !stageGPSData || !komData) return <PageLoading full={false} />

    let bounds = [];
    stageData.map((stage, key) => {
        const gpsData = JSON.parse(stageGPSData[stage.number]).latlng;
        bounds = bounds.concat(gpsData);
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
                    const male = komData[stage.number].M;
                    const female = komData[stage.number].F;
                    const gpsData = JSON.parse(stageGPSData[stage.number]).latlng;
                    bounds = bounds.concat(gpsData);
                    return (
                        <div key={key}>
                            <Marker position={gpsData[0]} >
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
                                                    <div className="ml-2 flex flex-row flex-no-wrap items-center">
                                                        <span className="font-bold">{formatSeconds(male.activity_time)}</span>
                                                        <div className="ml-2 flex flex-col items-start">
                                                            <AppLink to={`/zavodnik/${male.athlete_id}`}>{male.athlete_name}</AppLink>
                                                            {
                                                                male.club_name && <AppLink to={`/klub/${male.club_id}`}>{male.club_name}</AppLink>
                                                            }
                                                        </div>
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
                                                    <div className="ml-2 flex flex-row items-center">
                                                        <span className="font-bold">{formatSeconds(female.activity_time)}</span>
                                                        <div className="ml-2 flex flex-col items-start">
                                                            <AppLink to={`/zavodnik/${female.athleteId}`}>{female.athlete_name}</AppLink>
                                                            {
                                                                female.club_name && <AppLink to={`/klub/${female.club_id}`}>{female.club_name}</AppLink>
                                                            }
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </Popup>
                            </Marker>
                            <Polyline positions={gpsData} color="red" />
                        </div>
                    )
                })}
                <FullscreenControl position="topleft" content={"full"} />
            </Map >
        </PageBox >
    )
}

export default StagesMap;