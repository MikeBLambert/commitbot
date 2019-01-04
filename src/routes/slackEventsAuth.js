const router = require('express').Router();

module.exports = router.post('/', (req, res) => {
  let status = 200;
  const { challenge } = req.body;
  res.status(status).send(challenge);
});
