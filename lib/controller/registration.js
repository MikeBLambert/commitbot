"use strict";

var controller = require('./spawnController');

var BOT_RESPONSES = require('../fixtures/botResponses');

controller.hears(['register me'], 'direct_message,direct_mention,mention', function (bot, message) {
  controller.storage.users.get(message.user, function (err, user) {
    if (user && user.name) {
      bot.reply(message, 'Hello ' + user.name + '!! It looks like you\'ve already registered. Please type \'edit profile\' if you\'d like to make some changes to your profile.');
    } else {
      bot.startConversation(message, function (err, convo) {
        var user = {};

        if (!err) {
          convo.ask(BOT_RESPONSES.REGISTRATION_NAME, function (res, convo) {
            user = {
              id: message.user,
              team: message.text,
              name: res.text
            };
            convo.next();
          });
          convo.ask(BOT_RESPONSES.REGISTRATION_GITHUB_USERNAME, function (res, convo) {
            var transcript = convo.transcript;
            user.gitHubName = transcript[3].text;
            controller.storage.users.save(user);
            convo.next();
          });
          convo.say(BOT_RESPONSES.REGISTRATION_FAREWELL, function (res, convo) {
            convo.stop();
          });
        }
      });
    }
  });
});
//# sourceMappingURL=registration.js.map