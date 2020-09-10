import React from "react";

import moment from "moment";
import { useParams } from "react-router";
import useSWR from "swr";

import { PageBox, PageError, PageLoading } from "../layout/Page";
import { Box } from "../../utils/LayoutUtils";
import { ExternalLink, AppLink, tableClasses } from "../../utils/NavUtils";
import { formatSeconds, formatPosition, formatNumber } from "../../utils/FormatUtils";
import { fetcher, defaultGetOptions, API_URL } from "../../utils/FetchUtils";

import { VscSettings } from "react-icons/vsc";
import { MdTimer } from "react-icons/md";
import { FiUser, FiUsers } from "react-icons/fi";

import GoldMedal from "../../../assets/images/gold-medal.svg";
import SilverMedal from "../../../assets/images/silver-medal.svg";
import BronzeMedal from "../../../assets/images/bronze-medal.svg";

const getDefaultSort = data => {
    if (data.every(el => el.trailtour_time)) {
    }
};

const StageList = () => {

    const { number } = useParams();

    const [filter, setFilter] = React.useState("M");
    const { data: resultData, error: resultDataError } = useSWR(`${API_URL}/getStageResults?database=trailtour&number=${number}`, url => fetcher(url, defaultGetOptions));
    const { data: countData, error: countDataError } = useSWR(`${API_URL}/getResultsCount?database=trailtour&number=${number}`, url => fetcher(url, defaultGetOptions));

    if (resultDataError || countDataError) {
        console.log(resultDataError, countDataError);
        return <PageError full={false} />
    }

    if (!resultData || !countData) return <PageLoading full={false} />

    const firstAthlete = resultData.filter(val => val.athlete_gender === filter).reduce((a, b) => a.points > b.points ? a : b);
    const maxPoints = firstAthlete.points;

    const link = (text, count) => (
        <p>{`${text} (${count})`}</p>
    );

    return (
        <PageBox>
            <Box>
                <div className="p-2 flex flex-row items-center justify-center sm:justify-end">
                    <div onClick={() => setFilter("M")} className={`${tableClasses.className} ${filter === "M" ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{link("muži", countData.M)}</div>
                    <div onClick={() => setFilter("F")} className={`${tableClasses.className} ${filter === "F" ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{link("ženy", countData.F)}</div>
                </div>
                <div className="flex flex-col">
                    {
                        resultData.filter(val => val.athlete_gender === filter).sort((a, b) => b.points - a.points).map((row, index) => {
                            const pointsDifference = maxPoints === row.points ? null : formatNumber(maxPoints - row.points, 2)
                            return (
                                <div key={index} className="flex flex-col sm:flex-row items-center p-2 border-b border-grey-light">
                                    <div className="flex flex-row w-full sm:w-1/5 justify-center p-2">
                                        {
                                            row.position === 1 ? <img className="w-8 h-8" src={GoldMedal} /> : row.position === 2 ? <img className="w-8 h-8" src={SilverMedal} /> : row.position === 3 ? <img className="w-8 h-8" src={BronzeMedal} /> : <span>{formatPosition(row.position)}</span>
                                        }
                                    </div>
                                    <div className="flex flex-col w-full sm:w-2/3 justify-center items-center sm:items-start p-2">
                                        <div className="flex flex-row items-center sm:items-left">
                                            <FiUser className="min-w-icon min-h-icon mr-2" />
                                            <AppLink to={`/zavodnik/${row.athlete_id}`}>{row.athlete_name}</AppLink>
                                        </div>
                                        {
                                            row.club_id && (
                                                <div className="flex flex-row items-center">
                                                    <FiUsers className="min-w-icon min-h-icon mr-2" />
                                                    <AppLink to={`/klub/${row.club_id}`}>{row.club_name}</AppLink>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-row w-full sm:w-1/5 items-center justify-center">
                                        <MdTimer className="min-w-icon min-h-icon mr-1" />
                                        {row.activity_id ? <ExternalLink to={`http://strava.com/activities/${row.activity_id}`}>{formatSeconds(row.activity_time)}</ExternalLink> : row.trailtour_time ? formatSeconds(row.trailtour_time) : "---"}
                                    </div>
                                    <div className="flex flex-row w-full sm:w-1/5 items-center justify-center p-2">
                                        <VscSettings className="min-w-icon min-h-icon mr-2" />
                                        <div className="flex flex-col items-center">
                                            <span>{row.points ? `${formatNumber(row.points, 2)} b.` : "0.00 b."}</span>
                                            {pointsDifference && <span className="text-sm text-danger">{`-${pointsDifference} b.`}</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </Box>
        </PageBox>
    )

}

export default StageList;