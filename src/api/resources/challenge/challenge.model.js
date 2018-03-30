const mongoose = require('mongoose');
const config = require('../../../config/challenge');

const ChallengeSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
  },
}, {timestamps: true});

ChallengeSchema.index({createdAt: 1}, {expireAfterSeconds: config.expires});
module.exports.Challenge = mongoose.model('Challenge', ChallengeSchema);
