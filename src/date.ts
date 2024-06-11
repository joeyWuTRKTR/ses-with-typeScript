function getFirstDayOfMonthTimestamp(dateTimeStamp) {
    const date = new Date(dateTimeStamp);

    // Set the date to 1st of the month in UTC
    date.setUTCDate(1);

    // Set the time to midnight (0 hours, 0 minutes, 0 seconds) in UTC
    date.setUTCHours(0, 0, 0, 0);

    return date.getTime();
}


function getDateFormatted(timeStamp) {
    const year = timeStamp.getFullYear();
    const month = String(timeStamp.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(timeStamp.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
}

function getDateAndTimeFormatted(timeStamp) {
    const date = new Date(timeStamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
    getFirstDayOfMonthTimestamp,
    getDateFormatted,
    getDateAndTimeFormatted
}
