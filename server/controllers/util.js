module.exports = {
  parseErr(err) {
    if (!err.errors) return err;
    const messages = Object.keys(err.errors).map(errorKey =>
      `${errorKey} error: ${err.errors[errorKey]}`);
    return messages;
  },
};
