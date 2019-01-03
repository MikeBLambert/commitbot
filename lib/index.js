"use strict";

require('dotenv').config();

var PORT = 4000;

var express = require('express');

var app = express();

var fork = require('./routes/app');

require('./controller/registration');

require('./controller/edit');

app.use(express.json());
app.use('/fork', fork);
app.listen(PORT, function () {
  console.log('Running on port', PORT);
});
//# sourceMappingURL=index.js.map