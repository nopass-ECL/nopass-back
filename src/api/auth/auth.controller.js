const rsakey = require('../key/rsa.controller');

module.exports.decypher = (req, res) => {
  const cypher = req.body.cypher;

  const message = rsakey.decrypt(cypher, 'utf8')
  res.send({message: message})
}
