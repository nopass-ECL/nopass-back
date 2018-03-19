const mongoose = require('mongoose');

const config = require('./index');

mongoose.connect(config.mongodb.uri)
  // .then(e => console.log(e)).catch(e => console.log(e));
