const {Router} = require('express');

const router = new Router();

router.get('/', (req, res) => res.send('Hello, World!'));

router.use('/auth', require('./auth'));

router.get('/:name', (req, res) => res.send(`Hello, ${req.params.name}!`));

module.exports = router;
