const locationReducer = (state = {}, { type, payload }) => {
  if (type === 'STORE LOCATION') {
    return payload;
  }
  return state;
};

export default locationReducer;
