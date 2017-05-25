const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connection
  .once('open', () => console.log('Connected to mongodb.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

if (process.env.NODE_ENV === 'dev') {
  mongoose.connect('mongodb://localhost/OI_dev');
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/OI_test');
} else {
  mongoose.connect('prodserver');
}
