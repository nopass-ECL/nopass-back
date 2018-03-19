const User = require('./user.model').User;
const Challenge = require('../challenge/challenge.controller');
const getUsers = () => User.find({});
const getUserById = userId => User.findOne({_id: userId});

const getUserByName = userName => User.findOne({name: userName});
module.exports.getUserByName = getUserByName;

module.exports.findUserByName = (req, res) => {
  getUserByName(req.params.name)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          code: 'USER_NOT_FOUND',
          message: `L\'utilisateur ${req.params.name} n\' pas pu être trouvé`,
        })
      } else {
        res.send(user)
      }
    })
};

module.exports.getUserById = getUserById;
module.exports.updateChallengeReq = (req, res) => {
  updateChallenge(req.params.name, req.params.value)
    .then(challenge => res.send(challenge))
    .catch(err => res.status(500).send({error: err}))
};

const updateChallenge = async (username, challengeValue) => {
  try {
    const user = await getUserByName(username);
    const oldChallenge = await getChallengeOfUser(user).catch(err => console.error(`oldChallengeError :${err}`));
    const newChallenge = await Challenge.create(challengeValue).catch(err => console.error(`newChallengeError :${err}`));
    await Challenge.save(newChallenge).catch(err => console.log('saveError' + err));
    await User.findOneAndUpdate({name: username}, {challenge: newChallenge._id});
    if (oldChallenge)
      await Challenge.delete(oldChallenge);
    return newChallenge
  } catch (error) {
    throw error
  }
};
module.exports.updateChallenge = updateChallenge

module.exports.getChallengeOfUser = (user) => {
  return getChallengeOfUser(user)
};

const getChallengeOfUser = async (user) => {
  return new Promise((async (resolve, reject) => {
      const challenge = await Challenge.get(user.challenge)
    if (challenge) {
        resolve(challenge)
      } else {
        reject()
      }
    })
  )
};

module.exports.delete = (req, res) => {
  User.deleteOne(
    {_id: req.params.id},
    (err) => {
      if (err) {
        return res.status(500)
          .json(err);
      }
      return res.status(204)
        .end();
    },
  );
};

module.exports.create = (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) {
      if (err.code === 11000 || err.code === 11001) {
        return res.status(400).json({
          message: `L'utilisateur ${req.body.name} existe déjà !`
        })
      }
      return res.status(500)
        .json(err);
    }
    return res.status(201)
      .json(user);
  });
};

module.exports.findOne = (req, res) => {
  getUserById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404)
          .json({
            code: 'USER_NOT_FOUND',
            message: 'L\'utilisateur n\' pas pu être trouvé',
          });
      } else {
        res.status(200)
          .json(user);
      }
    })
    .catch(err => res.status(500)
      .json(err));
};

module.exports.getAll = (req, res) => {
  getUsers()
    .then(users => res.status(200)
      .json(users))
    .catch(err => res.status(500)
      .json(err));
};
