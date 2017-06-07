module.exports = {
  addMarkers(markers) {
    return {
      type: 'ADD MARKERS',
      payload: markers,
    };
  },
};
