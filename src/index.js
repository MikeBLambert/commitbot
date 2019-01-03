require('dotenv').config();
const PORT = 4000;
const express = require('express');
const app = express();
app.use(express.json());
const forkLoad = require('./routes/app');

require('./controller/registration');

app.use('/fork', forkLoad);

app.listen(PORT, () => {
  console.log('Running on port', PORT);
});
