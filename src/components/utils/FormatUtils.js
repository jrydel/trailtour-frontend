export const formatNumberWithDefault = (number, defaultValue) => number ? number.toLocaleString("cz") : defaultValue;
export const formatNumber = (number, digits = 0) => number.toLocaleString("cz", { minimumFractionDigits: digits });
export const formatStageNumber = number => number ? (number > 9 ? "#" : "#0") + number : null;

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