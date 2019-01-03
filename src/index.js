require('dotenv').config();
const PORT = 4000;
const express = require('express');
const app = express();
const fork = require('./routes/app');

require('./controller/registration');
require('./controller/edit');

app.use(express.json());
app.use('/fork', fork);

app.listen(PORT, () => {
  console.log('Running on port', PORT);
});
