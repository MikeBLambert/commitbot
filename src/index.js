require('dotenv').config();
const express = require('express');
const app = express();
const fork = require('./routes/app');

require('./controller/registration');
require('./controller/edit');

app.use(express.json());
app.use('/', fork);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Running on port', PORT);
});
