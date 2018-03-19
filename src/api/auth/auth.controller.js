const uuidv4 = require('uuid/v4');
const rsa = require('../key/rsa.controller');
const servPubKey = require('../../config/rsaj').pub;

const userController = require('../resources/User/user.controller');
const challengeController = require('../resources/challenge/challenge.controller');

module.exports.generateChallenge = (req, res) => {
  const {username} = req.query;
  generateChallenge(username)
    .then(encryptedChallenge => {
      res.send({encryptedChallenge, key: servPubKey});
    })
    .catch(err => {
      if (err === 'USER_NOT_FOUND') {
        res.status(404).send({
          code: 'USER_NOT_FOUND',
          message: `L\'utilisateur ${username} n\' pas pu être trouvé`,
        });
      }
    });
};

const generateChallenge = async username => {
  const user = await userController.getUserByName(username);
  if (!user) {
    throw "USER_NOT_FOUND";
  } else {
    const {publicKey} = user;
    const randomValue = uuidv4();
    const challenge = await userController.updateChallenge(username, randomValue);
    return rsa.encryptWithUserPubKey(challenge.value, publicKey);
  }
};

module.exports.verifyChallenge = (req, res) => {
  const {username} = req.query;
  const {challenge} = req.body;
  verifyChallenge(username, challenge).then(isChallengeValid => {
    if (isChallengeValid) {
      res.send({res: 'true'})
    } else {
      res.send(isChallengeValid)
    }
  })
    .catch(err => {
      if (err === 'USER_NOT_FOUND') {
        res.status(404).json({
          code: 'USER_NOT_FOUND',
          message: `L\'utilisateur ${req.params.name} n\' pas pu être trouvé`,
        })
      } else {
        res.status(500).send(err)
      }
    })
};

const verifyChallenge = async (username, challenge) => {
  const user = await userController.getUserByName(username);
  if (!user) {
    throw 'USER_NOT_FOUND'
  }
  try {
    const decryptedChallenge = rsa.decrypt(challenge);
    const localChallenge = await userController.getChallengeOfUser(user);
    return localChallenge.value === decryptedChallenge;
  } catch (err) {
    console.log(err);
    throw err
  }
};
