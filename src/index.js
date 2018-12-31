const app = require('./routes/app');

const PORT = 4000;

app.listen(PORT, () => {
  console.log('Running on port', PORT);
});
