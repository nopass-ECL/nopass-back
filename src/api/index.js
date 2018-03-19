const {Router} = require('express');

const router = new Router();

router.use('/resources', require('./resources'));
router.use('/auth', require('./auth'));
router.use('/key', require('./key'));

module.exports = router;
