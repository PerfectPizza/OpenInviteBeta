const moment = require('moment-timezone');

const localToUTC = (date) => {
  const zone = moment.tz.guess();
  const local = moment.tz(date, zone);
  const utc = local.tz('utc').format();
  return utc;
};

const UTCToLocal = (date) => {
  const zone = moment.tz.guess();
  return moment.tz(date, 'utc').tz(zone);
};

/* eslint-disable newline-per-chained-call */

const todayOrTomorrow = (time) => {
  const [curHours, curMinutes] = moment().format('HH:mm').split(':');
  const [hours, minutes] = moment(time).format('HH:mm').split(':');
  if (parseInt(hours, 10) > parseInt(curHours, 10)) {
    return moment().hours(hours).minutes(minutes);
  } else if (parseInt(hours, 10) === parseInt(curHours, 10)) {
    if (parseInt(minutes, 10) >= parseInt(curMinutes, 10)) {
      return moment().hours(hours).minutes(minutes).format();
    }
    return moment().hours(hours).minutes(minutes).add(1, 'd').format();
  }
  return moment().hours(hours).minutes(minutes).add(1, 'd').format();
};

module.exports = {
  localToUTC,
  UTCToLocal,
  todayOrTomorrow,
};
