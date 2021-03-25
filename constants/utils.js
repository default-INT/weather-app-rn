import {UNIX_TIMESTAMP} from "./index";

export const convertDateFromUTC = utcDate => {
    return new Date(utcDate * 1000);
}

export const toTempFormatter = kelvinTemp => {
    let temp = (kelvinTemp - 272.1).toFixed(0);
    if (temp > 0) {
        temp = '+ ' + temp;
    } else if (temp < 0) {
        temp = '- ' + temp;
    }
    return temp;
}


export const toTimeFormat = (hours, minutes) => {
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]