import React from "react";
import useSWR from "swr";

import { FiUsers } from "react-icons/fi";

import { fetcher, API_URL, defaultGetOptions } from "../../utils/FetchUtils";
import { PageError, PageLoading, PageBox } from "../layout/Page";
import { Box } from "../../utils/LayoutUtils";
import { AppLink } from "../../utils/NavUtils";
import { formatNumber, formatPosition } from "../../utils/FormatUtils";

import GoldMedal from "../../../assets/images/gold-medal.svg";
import SilverMedal from "../../../assets/images/silver-medal.svg";
import BronzeMedal from "../../../assets/images/bronze-medal.svg";

const ClubLadder = () => {

    const { data: ladderData, error: ladderError } = useSWR(`${API_URL}/getClubLadder?database=trailtour`, url => fetcher(url, defaultGetOptions));

    if (ladderError) {
        console.log(ladderError);
        return <PageError full={false} />
    }
    if (!ladderData) return <PageLoading full={false} />

    return (
        <PageBox>
            <Box>
                <div className="flex flex-col">
                    {
                        ladderData.sort((a, b) => b.trailtour_points - a.trailtour_points).map((row, index) => {
                            const positionText = row.trailtour_position ? formatPosition(row.trailtour_position) : "---";
                            const pointsText = row.trailtour_points ? `${formatNumber(row.trailtour_points, 2)} b.` : "0.00 b.";
                            return (
                                <div key={index} className="flex flex-col sm:flex-row items-center p-2 border-b border-grey-light">
                                    <div className="flex-1 flex flex-row justify-center p-2">
                                        {
                                            row.trailtour_position === 1 ? <img className="w-8 h-8" src={GoldMedal} /> : row.trailtour_position === 2 ? <img className="w-8 h-8" src={SilverMedal} /> : row.trailtour_position === 3 ? <img className="w-8 h-8" src={BronzeMedal} /> : <span>{positionText}</span>
                                        }
                                    </div>
                                    <div className="flex-1 flex flex-row justify-center sm:justify-start items-center p-2">
                                        <FiUsers className="min-w-icon min-h-icon mr-1" />
                                        <AppLink to={`/klub/${row.club_id}`}>{row.club_name}</AppLink>
                                    </div>
                                    <div className="flex-1 flex flex-row justify-center p-2">{pointsText}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </Box>
        </PageBox>
    )
}

export default ClubLadder;