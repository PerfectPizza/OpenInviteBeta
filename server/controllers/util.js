module.exports = {
  parseErr(err) {
    if (!err.errors) return err;
    const errorKeys = Object.keys(err.errors);
    const messages = [];
    for (let i = 0; i < errorKeys.length; i += 1) {
      messages.push(`${errorKeys[i]} error: ${err.errors[errorKeys[i]]}`);
    }
    return messages;
  },
};
