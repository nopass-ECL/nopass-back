const {Router} = require('express');

const router = new Router();

router.use('/auth', require('./auth'));

module.exports = router;
