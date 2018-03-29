const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    collation: {strength: 1},
    required: true,
  },
  publicKey: {
    type: String,
    required: true,
  },
  creationTime: {
    type: Date,
    default: () => Date.now(),
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
  }
});
UserSchema.index({name: 'text'});
module.exports.User = mongoose.model('User', UserSchema);
