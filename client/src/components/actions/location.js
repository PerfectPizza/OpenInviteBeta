module.exports = {
  storeLocation(location) {
    return {
      type: 'STORE LOCATION',
      payload: location,
    };
  },
};
