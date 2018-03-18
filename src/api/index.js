const {Router} = require('express');

const router = new Router();

router.use('/ressources', require('./ressources'));
router.use('/auth', require('./auth'));
router.use('/key', require('./key'));
module.exports = router;
