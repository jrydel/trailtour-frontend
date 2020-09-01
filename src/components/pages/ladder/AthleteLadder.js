import React from "react";
import useSWR from "swr";

import { FiUser, FiUsers } from "react-icons/fi";

import { fetcher, API_URL, defaultGetOptions } from "../../utils/FetchUtils";
import { PageError, PageLoading, PageBox } from "../layout/Page";
import { Box } from "../../utils/LayoutUtils";
import { AppLink } from "../../utils/NavUtils";
import { formatNumber, formatPosition } from "../../utils/FormatUtils";

import GoldMedal from "../../../assets/images/gold-medal.svg";
import SilverMedal from "../../../assets/images/silver-medal.svg";
import BronzeMedal from "../../../assets/images/bronze-medal.svg";

const AthleteLadder = ({ gender }) => {

    const { data: ladderData, error: ladderError } = useSWR(`${API_URL}/getAthleteLadder?database=trailtour&gender=${gender}`, url => fetcher(url, defaultGetOptions));

    if (ladderError) {
        console.log(ladderError);
        return <PageError full={false} />
    }
    if (!ladderData) return <PageLoading full={false} />

    const maxPoints = Math.max.apply(Math, ladderData.map(o => o.trailtour_points));

    return (
        <PageBox>
            <Box>
                <div className="flex flex-col">
                    {
                        ladderData.sort((a, b) => b.trailtour_points - a.trailtour_points).map((row, index) => {
                            const percent = row.trailtour_points ? row.stage_count / 0.5 : 0;
                            const percentText = row.trailtour_points ? `${row.stage_count}/50` : "0/50";
                            const positionText = row.trailtour_position ? formatPosition(row.trailtour_position) : "---";
                            const pointsText = row.trailtour_points ? `${formatNumber(row.trailtour_points, 2)} b.` : "0.00 b.";
                            const pointsDifferenceText = maxPoints === row.trailtour_points ? null : formatNumber(maxPoints - row.trailtour_points);
                            const bgColor = percent > 75 ? "bg-success" : percent > 50 ? "bg-yellow-500" : percent > 25 ? "bg-orange-500" : "bg-danger";
                            return (
                                <div key={index} className="flex flex-col sm:flex-row items-center p-2 border-b border-grey-light">
                                    <div className="flex-1 flex flex-row justify-center p-2">
                                        {
                                            row.trailtour_position === 1 ? <img className="w-8 h-8" src={GoldMedal} /> : row.trailtour_position === 2 ? <img className="w-8 h-8" src={SilverMedal} /> : row.trailtour_position === 3 ? <img className="w-8 h-8" src={BronzeMedal} /> : <span>{positionText}</span>
                                        }
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center items-center sm:items-start p-2">
                                        <div className="flex flex-row items-center sm:items-left">
                                            <FiUser className="min-w-icon min-h-icon mr-1" />
                                            <AppLink to={`/zavodnik/${row.athlete_id}`}>{row.athlete_name}</AppLink>
                                        </div>
                                        {
                                            row.club_id && (
                                                <div className="flex flex-row items-center">
                                                    <FiUsers className="min-w-icon min-h-icon mr-1" />
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
                                    <div className="flex-1 flex flex-col items-center p-2">
                                        <span>{pointsText}</span>
                                        {pointsDifferenceText && <span className="text-sm text-danger">{`-${pointsDifferenceText}`}</span>}
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