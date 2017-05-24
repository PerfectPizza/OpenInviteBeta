const { User } = require('../models');

module.exports = {
  getAllUsers(req, res) {
    return User.find({})
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        console.error('error in getAllUsers', err);
        res.status(500).send(err);
      });
  },
  getUser(req, res) {
    return User.findOne({ FBID: req.params.FBID })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        console.error('error in getUser', err);
        res.status(500).send(err);
      });
  },
  createUser(req, res) {
    User.findOne({ FBID: req.body.FBID })
      .then((userAlreadyExists) => {
        if (userAlreadyExists) {
          res.send(userAlreadyExists);
        } else {
          const user = new User(req.body);
          user.save()
            .then((savedUser) => {
              res.send(savedUser);
            })
            .catch((err) => {
              console.error('error in createUser', err);
              res.status(500).send(err);
            });
        }
      });
  },
};
