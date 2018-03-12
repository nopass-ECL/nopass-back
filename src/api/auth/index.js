const {Router} = require('express');

const router = new Router();

let dictTest = {};
router.get('/', (req, res) => res.send('auth test'));

router.post('/test', (req, res) => {
  dictTest['TEST'] = req.body.TEST;
  res.send('ok: ' + JSON.stringify(req.body))
});

router.get('/test', (req, res) => {
  res.send("res : " + (dictTest['TEST']))
});
module.exports = router;
