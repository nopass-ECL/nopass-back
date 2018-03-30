const Challenge = require('./challenge.model').Challenge;
const bcrypt = require('bcrypt');

const saltRounds = 10;
module.exports.create = async (uuid) => {
  const hash = await hashUuid(uuid)
  const challenge = new Challenge({
    hash,
  });
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await challenge.save())
    } catch (err) {
      reject(err)
    }
  })
};

const get = async (id) => {
  return Challenge.findOne({
    _id: id
  })
};

module.exports.get = get;

module.exports.getAll = (id) => {
  return Challenge.find({})
};
module.exports.getAll = () => Challenge.find({});

module.exports.save = (challenge) => {
  return challenge.save()
};

module.exports.delete = (id) => {
  return Challenge.deleteOne({
    _id: id
  })
};

const hashUuid = async (uuid) => {
  return bcrypt.hash(uuid, saltRounds)
};

module.exports.compareUuid = async (uuid, storedChallenge) => {
  return await bcrypt.compare(uuid, storedChallenge)
}
