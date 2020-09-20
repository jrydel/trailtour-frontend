import React from "react";
import useSWR from "swr";

import { FiUser, FiUsers } from "react-icons/fi";
import { VscOutput, VscCircleSlash } from "react-icons/vsc";

import { fetcher, API_URL, defaultGetOptions } from "../../utils/FetchUtils";
import { PageError, PageLoading, PageBox } from "../layout/Page";
import { Box } from "../../utils/LayoutUtils";
import { AppLink } from "../../utils/NavUtils";
import { formatNumber, formatPosition } from "../../utils/FormatUtils";

import GoldMedal from "../../../assets/images/gold-medal.svg";
import SilverMedal from "../../../assets/images/silver-medal.svg";
import BronzeMedal from "../../../assets/images/bronze-medal.svg";

const AthleteLadder = ({ gender }) => {

    const { data: ladderData, error: ladderError } = useSWR(`${API_URL}/getAthletes?database=trailtour&gender=${gender}`, url => fetcher(url, defaultGetOptions));

    if (ladderError) {
        console.log(ladderError);
        return <PageError full={false} />
    }
    if (!ladderData) return <PageLoading full={false} />

    const firstAthlete = ladderData.reduce((a, b) => a.trailtour_points > b.trailtour_points ? a : b);
    const maxPoints = firstAthlete.trailtour_points;
    const maxAverage = firstAthlete.trailtour_points / firstAthlete.trailtour_stages_count;

    return (
        <PageBox>
            <Box>
                <div className="flex flex-col">
                    {
                        ladderData.sort((a, b) => b.trailtour_points - a.trailtour_points).map((row, index) => {
                            const percent = row.trailtour_points ? row.trailtour_stages_count / 0.5 : 0;
                            const percentText = row.trailtour_points ? `${row.trailtour_stages_count}/50` : "0/50";
                            const bgColor = percent > 75 ? "bg-success" : percent > 50 ? "bg-yellow-500" : percent > 25 ? "bg-orange-500" : "bg-danger";

                            const positionText = row.trailtour_position ? formatPosition(row.trailtour_position) : "---";

                            const pointsText = row.trailtour_points ? `${formatNumber(row.trailtour_points, 2)} b.` : "0.00 b.";
                            const pointsDifferenceText = maxPoints === row.trailtour_points ? null : formatNumber(maxPoints - row.trailtour_points, 2);

                            const average = row.trailtour_points / row.trailtour_stages_count;
                            const averageText = `${formatNumber(average, 2, "0.00")} b.`;
                            const averageDifference = average - maxAverage;
                            const averageDifferenceText = average === maxAverage ? null : `${formatNumber(averageDifference, 2, "0.00")} b.`;

                            return (
                                <div key={index} className="flex flex-col sm:flex-row items-center border-b border-grey-light">
                                    <div className="w-full sm:w-1/12 flex flex-row justify-center p-2">
                                        {
                                            row.trailtour_position === 1 ? <img className="w-8 h-8" src={GoldMedal} /> : row.trailtour_position === 2 ? <img className="w-8 h-8" src={SilverMedal} /> : row.trailtour_position === 3 ? <img className="w-8 h-8" src={BronzeMedal} /> : <span>{positionText}</span>
                                        }
                                    </div>
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
                                    <div className="flex-1 flex flex-row w-full justify-center p-2">
                                        <div className="flex-1 flex flex-row items-center justify-center relative bg-background rounded-md">
                                            <span className="z-50">{percentText}</span>
                                            <div className={`absolute left-0 top-0 w-full h-full ${bgColor} rounded-md text-center text-dark`} style={{ width: `${percent}%` }} />
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-row items-center justify-center p-2">
                                        <VscOutput className="min-w-icon min-h-icon mr-2" />
                                        <div className="flex flex-col items-center">
                                            <span>{pointsText}</span>
                                            {pointsDifferenceText && <span className="text-sm text-danger">{`-${pointsDifferenceText} b.`}</span>}
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-row items-center justify-center p-2">
                                        <VscCircleSlash className="min-w-icon min-h-icon mr-2" />
                                        <div className="flex flex-col items-center">
                                            <span>{averageText}</span>
                                            <span className={`text-sm ${averageDifference > 0 ? "text-success" : "text-danger"}`}>{averageDifference > 0 ? `+${averageDifferenceText}` : averageDifferenceText}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Box>
        </PageBox>
    )
}

export default AthleteLadder;