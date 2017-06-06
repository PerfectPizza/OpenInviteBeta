const markersReducer = (state = [], { type, payload }) => {
  if (type === 'ADD MARKERS') {
    // payload is an array of markers
    return [...state, ...payload];
  }
  return state;
};

export default markersReducer;
