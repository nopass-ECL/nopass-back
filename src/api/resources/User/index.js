const {Router} = require('express');

const router = new Router();

const controller = require('./user.controller');

router.get('/', controller.getAll);
router.get('/:name', controller.findUserByName);
router.delete('/:id', controller.delete);
router.post('/', controller.create);
// router.post('/:name/challenge/:value', controller.updateChallenge);
module.exports = router;
