const RSA = require('node-rsa');

const config = require('../../config/rsa');
const key = new RSA(config.priv, 'pkcs1-private');

const encrypt = (message) => {
  const cypher = key.encrypt(message, 'base64');
  console.log(cypher);
  return cypher
};

const decrypt = (cypher) => {
  return key.decrypt(cypher, 'utf-8')
};

module.exports.encrypt = (req, res) => {
  const message = req.body.message;
  const cypher = encrypt(message);
  res.send({cypher})
};

module.exports.decrypt = (req, res) => {
  const cypher = req.body.cypher;
  const message = decrypt(cypher);
  res.send({message})
};

module.exports.getPub = (req, res) => {
  res.send({key: config.p})
};

const encryptWithUserPubKey = (message, key) => {
  const userKey = new RSA();
  userKey.importKey(key, 'pkcs8-public');
  const cypher = userKey.encrypt(message, 'base64');
  return cypher
};

const decryptWIthUserPrivKey = (cypher, key) => {
  const userKey = new RSA(key, 'pkcs1-private');
  const message = userKey.decrypt(cypher, 'utf-8');
  return message
};

module.exports.decryptWithUserKey = (req, res) => {
  const cypher = req.body.cypher;
  const key = req.body.key;
  const message = decryptWIthUserPrivKey(cypher, key)
  res.send({message})
};

module.exports.encryptWithUserKey = (req, res) => {
  const message = req.body.message;
  const key = req.body.key;
  const cypher = encryptWithUserPubKey(message, key);
  res.send({cypher})
};
