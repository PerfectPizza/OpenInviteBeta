module.exports = {
  storeUser(user) {
    return {
      type: 'STORE USER',
      payload: user,
    };
  },
};
