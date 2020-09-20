import React from "react";

import moment from "moment";
import { useParams } from "react-router";
import useSWR from "swr";

import { PageBox, PageError, PageLoading } from "../layout/Page";
import { Box } from "../../utils/LayoutUtils";
import { ExternalLink, AppLink, tableClasses } from "../../utils/NavUtils";
import { formatSeconds, formatPosition, formatNumber, formatPositionWithMedal } from "../../utils/FormatUtils";
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

    const [gender, setGender] = React.useState("M");
    const [showTT, setShowTT] = React.useState(true);

    const { data: maleResultData, error: maleResultDataError } = useSWR(`${API_URL}/getStageResults?database=trailtour&number=${number}&gender=M`, url => fetcher(url, defaultGetOptions));
    const { data: femaleResultData, error: femaleResultDataError } = useSWR(`${API_URL}/getStageResults?database=trailtour&number=${number}&gender=F`, url => fetcher(url, defaultGetOptions));
    const { data: countData, error: countDataError } = useSWR(`${API_URL}/getResultsCount?database=trailtour&number=${number}`, url => fetcher(url, defaultGetOptions));

    if (maleResultDataError || femaleResultDataError || countDataError) {
        console.log(resultDataError, countDataError);
        return <PageError full={false} />
    }

    if (!maleResultData || !femaleResultData || !countData) return <PageLoading full={false} />

    const resultData = gender === "M" ? maleResultData : femaleResultData;

    const firstAthlete = resultData.reduce((a, b) => showTT ? a.trailtour_points > b.trailtour_points ? a : b : a.points > b.points ? a : b);
    const maxPoints = firstAthlete.points;


    const link = (text, count) => (
        <p>{`${text} (${count})`}</p>
    );

    return (
        <PageBox>
            <Box>
                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-grey-light p-2">
                    <div className="flex flex-row items-center justify-center sm:justify-end">
                        <div onClick={() => setShowTT(true)} className={`${tableClasses.className} ${showTT ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{"Oficiální TT výsledky"}</div>
                        <div onClick={() => setShowTT(false)} className={`${tableClasses.className} ${!showTT ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{"Průběžné výsledky"}</div>
                    </div>
                    <div className="flex flex-row items-center justify-center sm:justify-end">
                        <div onClick={() => setGender("M")} className={`${tableClasses.className} ${gender === "M" ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{link("muži", countData.M)}</div>
                        <div onClick={() => setGender("F")} className={`${tableClasses.className} ${gender === "F" ? tableClasses.activeClassName : tableClasses.inactiveClassName}`}>{link("ženy", countData.F)}</div>
                    </div>
                </div>
                <div className="flex flex-col">
                    {
                        resultData.sort((a, b) => b.points - a.points).map((row, index) => {
                            if (showTT && !row.trailtour_points) {
                                return null;
                            }

                            const position = showTT ? row.trailtour_position : row.position;
                            const points = showTT ? row.trailtour_points : row.points;
                            const pointsDifference = maxPoints === row.points ? null : formatNumber(maxPoints - row.points, 2)

                            return (
                                <div key={index} className="flex flex-col sm:flex-row items-center border-b border-grey-light">
                                    <div className="w-full sm:w-1/12 flex flex-row justify-center p-2"> {formatPositionWithMedal(position)}</div>
                                    <div className="flex-1 flex flex-col justify-center items-center sm:items-start p-2">
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
                                    <div className="flex-1 flex flex-row items-center justify-center">
                                        {row.activity_date ? moment(row.activity_date).format("Do MMMM YYYY") : "---"}
                                    </div>
                                    <div className="flex-1 flex flex-row items-center justify-center">
                                        <MdTimer className="min-w-icon min-h-icon mr-1" />
                                        {
                                            showTT ?
                                                (
                                                    row.trailtour_time === row.activity_time ?
                                                        (
                                                            <ExternalLink to={`http://strava.com/activities/${row.activity_id}`}>{formatSeconds(row.activity_time)}</ExternalLink>
                                                        ) : (
                                                            formatSeconds(row.trailtour_time)
                                                        )
                                                ) : (
                                                    row.activity_time ? (
                                                        <ExternalLink to={`http://strava.com/activities/${row.activity_id}`}>{formatSeconds(row.activity_time)}</ExternalLink>
                                                    ) : (
                                                            formatSeconds(row.trailtour_time)
                                                        )
                                                )
                                        }
                                    </div>
                                    <div className="flex-1 flex flex-row items-center justify-center p-2">
                                        <VscSettings className="min-w-icon min-h-icon mr-2" />
                                        <div className="flex flex-col items-center">
                                            <span>{points ? `${formatNumber(points, 2)} b.` : "0.00 b."}</span>
                                            {pointsDifference && <span className="text-sm text-danger">{`-${pointsDifference} b.`}</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </Box>
        </PageBox >
    )

}

export default StageList;