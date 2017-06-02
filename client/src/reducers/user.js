const userReducer = (state = {}, { type, payload }) => {
  if (type === 'STORE USER') {
    // payload is an object of facebook data
    return payload;
  }
  return state;
};

export default userReducer;
