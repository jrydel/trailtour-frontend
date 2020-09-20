import React from "react";

import useSWR from "swr";
import moment from "moment";
import { useParams } from "react-router";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import FullscreenControl from "react-leaflet-fullscreen";
import { RiTimerLine, RiTimerFlashLine } from "react-icons/ri";
import { DiGitCompare } from "react-icons/di";
import { VscSettings } from "react-icons/vsc";
import { MdTimer } from "react-icons/md";

import { formatStageNumber, formatSeconds, formatNumber, formatNumberWithDefault, formatSecondsWithDefault, formatPosition, formatPositionWithMedal } from "../../utils/FormatUtils";
import { AppLink, ExternalLink, pageClasses } from "../../utils/NavUtils";
import Page, { PageTitle, PageError, PageLoading, PageBox } from "../layout/Page";
import { fetcher, defaultGetOptions, API_URL } from "../../utils/FetchUtils";
import { Box } from "../../utils/LayoutUtils";
import StravaImage from "../../../assets/images/strava.jpg";
import StravaKomIcon from "../../../assets/images/strava-kom.png";
import { icon } from "../../utils/MapUtils";
import { useStateValue } from "../../StateContext";

import WinnerMedal from "../../../assets/images/winner.png";

const generateColor = (row, applyAverage, trailtourAverage) => {
    if (!row) return "grey";
    if (row.trailtour_points) {
        if (!row.activity_id) return "red";
        if (applyAverage && row.trailtour_points < trailtourAverage) return "orange";
        if (row.trailtour_position === 1) return "gold";
        return "green";
    }
    return "blue";
}

const Athlete = () => {

    const { id } = useParams();

    const [{ user }, dispatch] = useStateValue();

    const [applyAverage, setApplyAverage] = React.useState(false);

    const { data: athleteData, error: athleteDataError } = useSWR(`${API_URL}/getAthlete?database=trailtour&id=${id}`, url => fetcher(url, defaultGetOptions));
    const { data: compareResultsData, error: compareResultsError } = useSWR(user ? `${API_URL}/getAthleteResults?database=trailtour&id=${user.id}` : null, url => fetcher(url, defaultGetOptions));
    const { data: athleteResultsData, error: athleteResultsError } = useSWR(() => `${API_URL}/getAthleteResults?database=trailtour&id=${athleteData.athlete_id}`, url => fetcher(url, defaultGetOptions));
    const { data: komData, error: komError } = useSWR(`${API_URL}/getKomResults?database=trailtour`, url => fetcher(url, defaultGetOptions));
    const { data: stagesGPSData, error: stagesGPSError } = useSWR(`${API_URL}/getAllStagesGPSStart?database=trailtour`, url => fetcher(url, defaultGetOptions));

    if (athleteDataError || user ? compareResultsError : false || athleteResultsError || komError || stagesGPSError) {
        console.log(athleteDataError, compareResultsData, athleteResultsError, komError, stagesGPSError);
        return <PageError />
    }

    if (!athleteData || user ? !compareResultsData : false, !athleteResultsData || !komData || !stagesGPSData) return <PageLoading full={true} />

    athleteResultsData.map(item => {
        const temp = compareResultsData?.find(val => val.stage_number === item.stage_number);
        if (temp) {
            item.compare_trailtour_points = temp.trailtour_points;
            item.compare_points = temp.points;
            item.compare_trailtour_time = temp.trailtour_time;
            item.compare_activity_id = temp.activity_id;
            item.compare_activity_time = temp.activity_time;
            item.compare_trailtour_position = temp.trailtour_position;
            item.compare_position = temp.position;
        }
    });

    const average = formatNumber(athleteData.points / athleteData.stages_count, 2);
    const trailtourAverage = formatNumber(athleteData.trailtour_points / athleteData.trailtour_stages_count, 2);

    let bounds = [];
    stagesGPSData.map(stage => {
        bounds = [...bounds, [stage.latitude, stage.longitude]];
    });

    return (
        <Page>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex flex-col sm:flex-row items-center">
                        <PageTitle>
                            <div className="flex flex-row items-center justify-center">
                                {athleteData.athlete_id === 27058130 &&
                                    <div className="tooltip">
                                        <img className="w-8 h-8" src={WinnerMedal} />
                                        <span className="tooltip-text border rounded bg-dark text-light">Vítěz MČR ve sprintu 2020</span>
                                    </div>
                                }
                                <span>{athleteData.athlete_name}</span>
                            </div>
                        </PageTitle>
                        {
                            athleteData.club_name && <div className="ml-2 text-center"><AppLink to={`/klub/${athleteData.club_id}`}>{athleteData.club_name}</AppLink></div>
                        }
                    </div>
                    <div className="flex flex-row items-center justify-center sm:justify-end">
                        <ExternalLink to={`https://www.strava.com/athletes/${athleteData.athlete_id}`} className={pageClasses.className}><img className="w-15 h-10 rounded" src={StravaImage} alt="Strava" /></ExternalLink>
                        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-15 h-10" onClick={() => dispatch({ type: "SET_USER", user: { id: athleteData.athlete_id, name: athleteData.athlete_name } })}><DiGitCompare className="h-6 w-6" /></button>
                    </div>
                </div>
            </PageBox>
            <PageBox>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                    <Box className="p-3 flex flex-col sm:flex-row items-center text-sm">
                        <div className="flex flex-col">
                            <span className="px-2">{`Etap: ${athleteData.trailtour_stages_count}/50 (TT)`}</span>
                            <span className="px-2">{`Etap: ${athleteData.stages_count}/50`}</span>
                        </div>
                        {/* <div className="flex flex-col">
                            <span className="px-2">{`Etap: ${athleteData.trailtour_stages_count}/50 (TT)`}</span>
                            <span className="px-2">{`Etap: ${athleteData.stages_count}/50`}</span>
                        </div> */}
                        <div className="flex flex-col">
                            <span className="px-2">{`Pozice: ${athleteData.trailtour_position} (TT)`}</span>
                            <span className="px-2">{`Pozice: ${athleteData.position}`}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="px-2">{`Body: ${athleteData.trailtour_points} (TT)`}</span>
                            <span className="px-2">{`Body: ${athleteData.points}`}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="px-2">{`Průměr: ${trailtourAverage} (TT)`}</span>
                            <span className="px-2">{`Průměr: ${average}`}</span>
                        </div>
                    </Box>
                    <Box className="p-3">
                        <label className="flex items-center cursor-pointer">
                            <div className="mr-3 text-sm">
                                Zvýraznit podprůměrné výkony
                            </div>
                            <div className="relative">
                                <input type="checkbox" className="hidden" checked={applyAverage} onChange={() => setApplyAverage(prev => !prev)} />
                                <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-2 left-0"></div>
                            </div>
                        </label>
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
                            const kom = komData[item.stage_number] ? komData[item.stage_number][[athleteData.athlete_gender]] : null;
                            const result = athleteResultsData.find(val => val.stage_number === item.stage_number);
                            const stageGps = stagesGPSData.find(val => val.stage_number === item.stage_number);

                            return <Marker key={`stage-${item.stage_number}`} position={[stageGps.latitude, stageGps.longitude]} icon={icon(generateColor(result, applyAverage, trailtourAverage))}>
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
                                                            kom && kom.athlete_id === athleteData.athlete_id ? <img src={StravaKomIcon} className="w-5" /> : <RiTimerLine className="w-5 h-5" />
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
                                            kom && kom.athlete_id !== athleteData.athlete_id && (
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
                    <div className="flex flex-col">
                        {
                            athleteResultsData.sort((a, b) => b.activity_date - a.activity_date).map((row, index) => {
                                const position = row.trailtour_position ? row.trailtour_position : position;
                                return (
                                    <div key={index} className="flex flex-col sm:flex-row items-center p-2 border-b border-grey-light">
                                        <div className="w-full sm:w-1/12 flex flex-row justify-center p-2">
                                            {formatPositionWithMedal(position)}
                                        </div>
                                        <div className="flex-1 flex flex-row items-center justify-center sm:justify-start">
                                            <img className="w-5 mr-2" src={`https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${generateColor(row, applyAverage, trailtourAverage)}.png`} />
                                            <AppLink to={`/etapa/${row.stage_number}`}>{formatStageNumber(row.stage_number) + " - " + row.stage_name}</AppLink>
                                        </div>
                                        <div className="flex-1 flex flex-row items-center justify-center">
                                            {row.activity_date ? moment(row.activity_date).format("Do MMMM YYYY") : "---"}
                                        </div>
                                        <div className="flex-1 flex flex-col items-center justify-center">
                                            <div className="flex flex-row  items-center justify-center">
                                                <MdTimer className="min-w-icon min-h-icon mr-1" />
                                                {row.activity_id ? <ExternalLink to={`http://strava.com/activities/${row.activity_id}`}>{formatSeconds(row.activity_time)}</ExternalLink> : row.trailtour_time ? formatSeconds(row.trailtour_time) : "---"}
                                            </div>
                                            {
                                                user && row.compare_trailtour_time &&
                                                <div className={`flex flex-row items-center ${row.compare_trailtour_time === row.trailtour_time ? "bg-blue-400" : row.compare_trailtour_time < row.trailtour_time ? "bg-green-400" : "bg-red-400"}`}>
                                                    <MdTimer className="min-w-icon min-h-icon mr-1" />
                                                    <span>
                                                        {formatSeconds(row.compare_trailtour_time)}
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                        <div className="flex-1 flex flex-col items-center justify-center">
                                            {
                                                row.trailtour_points ?
                                                    (
                                                        <div className="flex flex-row items-center">
                                                            <div className="flex flex-row items-center">
                                                                <VscSettings className="min-w-icon min-h-icon mr-1" />
                                                                <span>{`${formatNumber(row.trailtour_points, 2)} b. (TT)`}</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-row items-center">
                                                            <VscSettings className="min-w-icon min-h-icon mr-1" />
                                                            <span>{`${formatNumber(row.points, 2)} b.`}</span>
                                                        </div>
                                                    )
                                            }
                                            {
                                                user && row.compare_trailtour_points &&
                                                <div className="flex flex-row items-center">
                                                    <div className={`flex flex-row items-center ${row.compare_trailtour_points === row.trailtour_points ? "bg-blue-400" : row.compare_trailtour_points > row.trailtour_points ? "bg-green-400" : "bg-red-400"}`}>
                                                        <VscSettings className="min-w-icon min-h-icon mr-1" />
                                                        <span>
                                                            {`${formatNumber(row.compare_trailtour_points, 2)} b. (TT)`}
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Box>
            </PageBox >
        </Page >
    )
}

export default Athlete;