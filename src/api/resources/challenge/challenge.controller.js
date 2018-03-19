const Challenge = require('./challenge.model').Challenge;

module.exports.create = (value) => {
  const challenge = new Challenge({
    value,
  });
  console.log(`challenge: ${challenge}`);
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await challenge.save())
    } catch (err) {
      reject(err)
    }
  })
};

module.exports.get = (id) => {
  return Challenge.findOne({
    _id: id
  })
};

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
