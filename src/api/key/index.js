const {Router} = require('express');

const router = new Router();
const rsa = require('./rsa.controller');

router.get('/', rsa.getPub);
router.post('/encrypt', rsa.encryptReq);
router.post('/decrypt', rsa.decryptReq);
router.post('/encryptWithUserKey', rsa.encryptWithUserKeyReq);
router.post('/decryptWithUserKey', rsa.decryptWithUserKeyReq);
module.exports = router;
