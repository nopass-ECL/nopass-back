const {Router} = require('express');

const router = new Router();

const controller = require('./auth.controller');

router.get('/generateChallenge', controller.generateChallenge);

module.exports = router;
