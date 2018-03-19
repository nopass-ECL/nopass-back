const {Router} = require('express');

const router = new Router();
const rsa = require('../key/rsa.controller');
let dictTest = {};
router.get('/', (req, res) => res.send('auth test'));

router.get('/rsa', (req, res) => {
  res.status(201).send();
});

router.post('test');
router.get('/test', (req, res) => {
  res.send("res : " + (dictTest['TEST']))
});
module.exports = router;
