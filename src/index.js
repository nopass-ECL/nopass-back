const path = require('path');

const express = require('express');
const config = require('./config');

const BodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);

app.use(BodyParser.json())
app.use('/api', require('./api'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


server.listen(config.app.port, (err) => {
  if (err) console.error(err);
  else console.log(`Listening on port ${config.app.port}`);
});
