module.exports = {
  storeMap(googleMapsClient) {
    return {
      type: 'STORE MAP',
      payload: googleMapsClient,
    };
  },
};
