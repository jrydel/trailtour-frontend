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
import { icon } from "../../utils/MapUtils";

const computeAverage = (arr) => arr.reduce((p, c) => p + (c === null ? 0 : c), 0) / arr.length;

const Athlete = () => {

    const { id } = useParams();

    const { data: athleteData, error: athleteDataError } = useSWR(`${API_URL}/getAthlete?database=trailtour_cz&id=${id}`, url => fetcher(url, defaultGetOptions));
    const { data: athleteResultsData, error: athleteResultsError } = useSWR(() => `${API_URL}/getAthleteResults?database=trailtour_cz&athleteId=${athleteData.id}`, url => fetcher(url, defaultGetOptions));

    if (athleteDataError || athleteResultsError) {
        console.log(athleteDataError, athleteResultsError);
        return <PageError />
    }

    if (!athleteData || !athleteResultsData) return <PageLoading full={true} />

    const tableOptions = [
        { header: 'Datum', align: "center", sort: { id: "activity.date", direction: "desc" }, render: row => moment(row.activity.date).format("Do MMMM") },
        { header: 'Etapa', align: "left", sort: { id: "stage.number" }, render: row => <AppLink to={`/etapa/${row.stage.number}`}>{formatStageNumber(row.stage.number) + " - " + row.stage.name}</AppLink> },
        { header: "Pozice", align: "center", sort: { id: "activityResult.position" }, render: row => row.activityResult.position },
        { header: "Pozice TT", align: "center", sort: { id: "activityResult.trailtourPosition" }, render: row => row.activityResult.trailtourPosition },
        { header: "Čas", align: "right", sort: { id: "activity.time" }, render: row => <ExternalLink to={`https://strava.com/activities/${row.activity.id}`}>{formatSeconds(row.activity.time)}</ExternalLink> },
        { header: "Čas TT", align: "right", sort: { id: "activityResult.trailtourTime" }, render: row => row.activityResult.trailtourTime && formatSeconds(row.activityResult.trailtourTime) },
        { header: "Body", align: "right", sort: { id: "activityResult.points" }, render: row => row.activityResult.points },
        { header: "Body TT", align: "right", sort: { id: "activityResult.trailtourPoints" }, render: row => row.activityResult.trailtourPoints }
    ];

    const filteredData = athleteResultsData.filter(item => item.activityResult);
    const average = computeAverage(filteredData.map(item => item.activityResult.points));
    const trailtourAverage = computeAverage(filteredData.map(item => item.activityResult.trailtourPoints).filter(x => x));

    return (
        <Page>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <PageTitle>{athleteData.name}</PageTitle>
                    <ExternalLink to={`https://www.strava.com/athletes/${athleteData.id}`} className={pageClasses.className}><img className="w-15 h-10 rounded" src={StravaImage} alt="Strava" /></ExternalLink>
                </div>
            </PageBox>
            <PageBox>
                <div className="flex flex-row items-center justify-center sm:justify-start">
                    <Box className="p-3 inline-flex flex-col sm:flex-row items-center text-sm">
                        <p className="px-2">{`Etapy: ${filteredData.length} / ${athleteResultsData.length}`}</p>
                        <p className="px-2">{`Pozice: ${athleteData.ladder.position} / ${athleteData.ladder.trailtourPosition}`}</p>
                        <p className="px-2">{`Body: ${athleteData.ladder.points} / ${athleteData.ladder.trailtourPoints}`}</p>
                        <p className="px-2">{`Průměr: ${average.toFixed(2)} / ${isNaN(trailtourAverage) ? 0 : trailtourAverage.toFixed(2)}`}</p>
                    </Box>
                </div>
            </PageBox>
            <PageBox>
                <Map
                    style={{ width: "100%", height: "400px" }}
                    center={[49.8037633, 15.4749126]}
                    zoom={7}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {
                        athleteResultsData.map((item, key) =>
                            <Marker key={key} position={[item.stage.coordinates.latitude, item.stage.coordinates.longitude]} icon={icon(item.activity && item.activityResult ? (item.activity.position === 1 ? "gold" : "green") : "grey")}>
                                <Popup>
                                    <div className="flex flex-col p-2 items-start">
                                        <div className="mb-2">
                                            <AppLink to={`/etapa/${item.stage.number}`} >{formatStageNumber(item.stage.number) + " - " + item.stage.name}</AppLink>
                                        </div>
                                        <div className="mb-2 flex flex-row items-center justify-start">
                                            <div class="tooltip">
                                                <RiTimerLine className="w-5 h-5" />
                                                <span className="tooltip-text bg-dark text-light text-xs rounded py-1 px-4 ml-6 -mt-5">Zaběhnutý čas</span>
                                            </div>
                                            <span className="ml-2">--:--:--</span>
                                        </div>
                                        <div className="mb-2 flex flex-row items-center justify-start">
                                            <div class="tooltip">
                                                <RiTimerFlashLine className="w-5 h-5" />
                                                <span className="tooltip-text bg-dark text-light text-xs rounded py-1 px-4 ml-6 -mt-5">Odhadovaný čas</span>
                                            </div>
                                            <span className="ml-2">--:--:--</span>

                                        </div>
                                        <div className="flex flex-row items-center justify-start">
                                            <div class="tooltip">
                                                <img className="w-5" src="../src/assets/images/strava-kom.png" />
                                                <span className="tooltip-text bg-dark text-light text-xs rounded py-1 px-4 ml-6 -mt-4">Nejrychlejší čas</span>
                                            </div>
                                            <span className="ml-2">--:--:-- (Miloš Nykodým)</span>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    }
                    <FullscreenControl position="topleft" content={"full"} />
                </Map >
            </PageBox>
            <PageBox>
                <Box>
                    <Table options={tableOptions} data={filteredData} />
                </Box>
            </PageBox>
        </Page >
    )
}

export default Athlete;