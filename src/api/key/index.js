const {Router} = require('express');

const router = new Router();
const rsa = require('./rsa.controller');

router.get('/', rsa.getPub);
router.post('/encrypt', rsa.encrypt);
router.post('/decrypt', rsa.decrypt);
router.post('/encryptWithUserKey', rsa.encryptWithUserKey);
router.post('/decryptWithUserKey', rsa.decryptWithUserKey);
module.exports = router;
