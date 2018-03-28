const RSA = require('node-rsa');

const config = require('../../config/rsaj');
console.log(config.priv);
const key = new RSA(config.priv, 'pkcs1-private');

const encrypt = (message) => {
  const cypher = key.encrypt(message, 'base64');
  return cypher
};
module.exports.encrypt = encrypt;

const decrypt = (cypher) => {
  return key.decrypt(cypher, 'utf-8')
};
module.exports.decrypt = decrypt;

module.exports.encryptReq = (req, res) => {
  const message = req.body.message;
  const cypher = encrypt(message);
  res.send({cypher})
};

module.exports.decryptReq = (req, res) => {
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
module.exports.encryptWithUserPubKey = encryptWithUserPubKey;

const decryptWithUserPrivKey = (cypher, key) => {
  const userKey = new RSA(key, 'pkcs1-private');
  const message = userKey.decrypt(cypher, 'utf-8');
  return message
};
module.exports.decryptWithUserPrivKey = decryptWithUserPrivKey;

module.exports.decryptWithUserKeyReq = (req, res) => {
  const cypher = req.body.cypher;
  const key = req.body.key;
  const message = decryptWithUserPrivKey(cypher, key);
  res.send({message})
};

module.exports.encryptWithUserKeyReq = (req, res) => {
  const message = req.body.message;
  const key = req.body.key;
  const cypher = encryptWithUserPubKey(message, key);
  res.send({cypher})
};
