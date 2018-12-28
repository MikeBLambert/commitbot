const express = require('express');
const app = express();

app.use(express.json());

app.post('/oauth', (req, res) => {
  let status = 200;
  const { challenge } = req.body;
  res.status(status).send(challenge);
});

module.exports = app;
