const {Router} = require('express');

const router = new Router();

router.use('/users', require('./User'));

module.exports = router;
