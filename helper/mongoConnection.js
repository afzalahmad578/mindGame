const mongoose = require('mongoose');
const config = require('../config/config');

// Connecting to the Database
mongoose.connect(config.config()['mongodb'], {
  auth: config.config()['auth'],
  useNewUrlParser: true
}).catch((err) => {
  console.log(err);
  console.log('Could not connect to Database');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Success fully Connected');
});
mongoose.set('debug', true);