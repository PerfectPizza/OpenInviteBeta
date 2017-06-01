const moment = require('moment-timezone');

const localToUTC = (date) => {
  const zone = moment.tz.guess();
  const local = moment.tz(date, zone);
  const utc = local.tz('utc').format();
  return utc;
};

const UTCToLocal = (date) => {
  const zone = moment.tz.guess();
  return moment.tz(date, 'utc').tz(zone).format()
  .split('-')
  .slice(0, 3)
  .join('-');
};

module.exports = {
  localToUTC,
  UTCToLocal,
};
