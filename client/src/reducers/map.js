const mapReducer = (state = {}, { type, payload }) => {
  if (type === 'STORE MAP') {
    return payload;
  }
  return state;
};

export default mapReducer;
