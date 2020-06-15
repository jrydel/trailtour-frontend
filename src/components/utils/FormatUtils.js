export const formatNumber = number => number.toLocaleString("cz");
export const formatStageNumber = number => (number > 9 ? "#" : "#0") + number;

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