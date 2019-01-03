const Botkit = require('botkit');

const mongoStorage = require('botkit-storage-mongo')({
  mongoUri: process.env.MONGO_URI
});
const controller = Botkit.slackbot({
  debug: false,
  storage: mongoStorage
});

controller
  .spawn({
    token: process.env.BOT_AUTH_TOKEN
  })
  .startRTM(function(err) {
    if(err) {
      throw new Error(err);
    }
  });

module.exports = controller;
