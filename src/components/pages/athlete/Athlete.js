import React from "react";

import useSWR from "swr";
import moment from "moment";
import { useParams } from "react-router";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import FullscreenControl from "react-leaflet-fullscreen";
import { RiTimerLine, RiTimerFlashLine } from "react-icons/ri";

import { formatStageNumber, formatSeconds } from "../../utils/FormatUtils";
import { AppLink, ExternalLink, pageClasses } from "../../utils/NavUtils";
import Page, { PageTitle, PageError, PageLoading, PageBox } from "../layout/Page";
import { fetcher, defaultGetOptions, API_URL } from "../../utils/FetchUtils";
import { Box } from "../../utils/LayoutUtils";
import { Table } from "../../utils/TableUtils";
import StravaImage from "../../../assets/images/strava.jpg";
import StravaKomIcon from "../../../assets/images/strava-kom.png";
import { icon } from "../../utils/MapUtils";

const computeAverage = (arr) => arr.reduce((p, c) => p + (c === null ? 0 : c), 0) / arr.length;

const Athlete = () => {

    const { id } = useParams();

    const { data: athleteData, error: athleteDataError } = useSWR(`${API_URL}/getAthlete?database=trailtour&id=${id}`, url => fetcher(url, defaultGetOptions));
    const { data: athleteResultsData, error: athleteResultsError } = useSWR(() => `${API_URL}/getAthleteResults?database=trailtour&id=${athleteData.id}`, url => fetcher(url, defaultGetOptions));
    const { data: komData, error: komError } = useSWR(`${API_URL}/getKomResults?database=trailtour`, url => fetcher(url, defaultGetOptions));
    const { data: stagesGPSData, error: stagesGPSError } = useSWR(`${API_URL}/getAllStagesGPSStart?database=trailtour`, url => fetcher(url, defaultGetOptions));

    if (athleteDataError || athleteResultsError || komError || stagesGPSError) {
        console.log(athleteDataError, athleteResultsError, komError, stagesError);
        return <PageError />
    }

    if (!athleteData || !athleteResultsData || !komData || !stagesGPSData) return <PageLoading full={true} />

    const tableOptions = [
        { header: "Pozice", align: "center", sort: { id: "position" }, render: row => row.position },
        { header: 'Etapa', align: "left", sort: { id: "stage_number" }, render: row => <AppLink to={`/etapa/${row.stage_number}`}>{formatStageNumber(row.stage_number) + " - " + row.stage_name}</AppLink> },
        { header: 'Datum', align: "center", sort: { id: "activity_date", direction: "desc" }, render: row => moment(row.activity_date).format("Do MMMM") },
        { header: "Čas", align: "right", sort: { id: "activity_time" }, render: row => <ExternalLink to={`https://strava.com/activities/${row.activity_id}`}>{formatSeconds(row.activity_time)}</ExternalLink> },
        { header: "Body", align: "right", sort: { id: "points" }, render: row => row.points },
    ];

    const average = computeAverage(athleteResultsData.map(item => item.points));

    let bounds = [];
    stagesGPSData.map(stage => {
        bounds = [...bounds, [stage.latitude, stage.longitude]];
    });

    return (
        <Page>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex flex-col sm:flex-row items-center">
                        <PageTitle>{athleteData.name}</PageTitle>
                        {
                            athleteData.club_name && <div className="ml-2 text-center"><AppLink to={`/klub/${athleteData.club_id}`}>{athleteData.club_name}</AppLink></div>
                        }
                    </div>
                    <ExternalLink to={`https://www.strava.com/athletes/${athleteData.id}`} className={pageClasses.className}><img className="w-15 h-10 rounded" src={StravaImage} alt="Strava" /></ExternalLink>
                </div>
            </PageBox>
            <PageBox>
                <div className="flex flex-row items-center justify-center sm:justify-start">
                    <Box className="p-3 inline-flex flex-col sm:flex-row items-center text-sm">
                        <p className="px-2">{`Etapy: ${athleteResultsData.length} / ${stagesGPSData.length}`}</p>
                        <p className="px-2">{`Pozice: ${athleteData.position}`}</p>
                        <p className="px-2">{`Body: ${athleteData.points}`}</p>
                        <p className="px-2">{`Průměr: ${average.toFixed(2)}`}</p>
                    </Box>
                </div>
            </PageBox>
            <PageBox>
                <Map
                    style={{ width: "100%", height: "400px" }}
                    center={[49.8037633, 15.4749126]}
                    bounds={bounds}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {
                        stagesGPSData.map(item => {
                            const kom = komData[item.stage_number][athleteData.gender];
                            const result = athleteResultsData.find(val => val.stage_number === item.stage_number);
                            const stageGps = stagesGPSData.find(val => val.stage_number === item.stage_number);

                            return <Marker key={`stage-${item.stage_number}`} position={[stageGps.latitude, stageGps.longitude]} icon={icon(result ? (result.position === 1 ? "gold" : "green") : "grey")}>
                                <Popup>
                                    <div className="flex flex-col p-2 items-start">
                                        <div className="mb-2">
                                            <AppLink to={`/etapa/${item.stage_number}`} >{formatStageNumber(item.stage_number) + " - " + item.stage_name}</AppLink>
                                        </div>
                                        {
                                            result && (
                                                <div className="mb-2 flex flex-row items-center justify-start">
                                                    <div className="tooltip">
                                                        {
                                                            kom && kom.athlete_id === athleteData.id ? <img src={StravaKomIcon} className="w-5" /> : <RiTimerLine className="w-5 h-5" />
                                                        }
                                                        <span className="tooltip-text bg-dark text-light text-xs rounded py-1 px-4 ml-6 -mt-5">Zaběhnutý čas</span>
                                                    </div>
                                                    <span className="ml-2"><ExternalLink to={`http://strava.com/activities/${result.activity_id}`}>{formatSeconds(result.activity_time)}</ExternalLink></span>
                                                </div>
                                            )
                                        }
                                        <div className="mb-2 flex flex-row items-center justify-start">
                                            <div className="tooltip">
                                                <RiTimerFlashLine className="w-5 h-5" />
                                                <span className="tooltip-text bg-dark text-light text-xs rounded py-1 px-4 ml-6 -mt-5">Odhadovaný čas</span>
                                            </div>
                                            <span className="ml-2">--:--:--</span>

                                        </div>
                                        {
                                            kom && kom.athlete_id !== athleteData.id && (
                                                <div className="flex flex-row items-center justify-start">
                                                    <div className="tooltip">
                                                        <img src={StravaKomIcon} className="w-5" />
                                                        <span className="tooltip-text bg-dark text-light text-xs rounded py-1 px-4 ml-6 -mt-4">Nejrychlejší muž</span>
                                                    </div>
                                                    <div className="ml-2 flex flex-row items-center">
                                                        <span className="mr-2"><ExternalLink to={`http://strava.com/activities/${kom.athlete_id}`}>{formatSeconds(kom.activity_time)}</ExternalLink></span>
                                                        <div className="ml-2 flex flex-col items-start">
                                                            <AppLink to={`/zavodnik/${kom.athlete_id}`}>{kom.athlete_name}</AppLink>
                                                            {
                                                                kom.club_name && <AppLink to={`/klub/${kom.club_id}`}>{kom.club_name}</AppLink>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </Popup>
                            </Marker>

                        })
                    }
                    <FullscreenControl position="topleft" content={"full"} />
                </Map >
            </PageBox>
            <PageBox>
                <Box>
                    <Table options={tableOptions} data={athleteResultsData} />
                </Box>
            </PageBox>
        </Page >
    )
}

export default Athlete;