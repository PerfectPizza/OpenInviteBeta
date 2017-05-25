module.exports = {
  /* decompose the Mongo error object in to an array of error messages */
  parseErr(err) {
    if (!err.errors) return err;
    const messages = Object.keys(err.errors).map(errorKey =>
      `${errorKey} error: ${err.errors[errorKey]}`);
    return messages;
  },
};
