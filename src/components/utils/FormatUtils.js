import React from "react";

import GoldMedal from "../../assets/images/gold-medal.svg";
import SilverMedal from "../../assets/images/silver-medal.svg";
import BronzeMedal from "../../assets/images/bronze-medal.svg";

export const formatNumberWithDefault = (number, defaultValue) => number ? number.toLocaleString("cz") : defaultValue;
export const formatNumber = (number, digits = 0, defaultValue = null) => number && !isNaN(number) ? Number(number).toFixed(digits).toLocaleString("cz") : defaultValue;
export const formatStageNumber = number => number ? (number > 9 ? "#" : "#0") + number : null;

export const formatPosition = number => number ? `${number}.` : "";
export const formatPositionWithMedal = position => position === 1 ? <img className="w-8 h-8" src={GoldMedal} /> : position === 2 ? <img className="w-8 h-8" src={SilverMedal} /> : position === 3 ? <img className="w-8 h-8" src={BronzeMedal} /> : <span>{formatPosition(position)}</span>


export const formatSeconds = secs => {
    if (!secs) {
        return null;
    }

    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":")
}

export const formatSecondsWithDefault = (secs, defaultValue) => {
    if (!secs) {
        return defaultValue;
    }

    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":")
}