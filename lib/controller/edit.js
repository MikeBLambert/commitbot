"use strict";

var controller = require('./spawnController');

var BOT_RESPONSES = require('../fixtures/botResponses');

controller.hears(['edit profile'], 'direct_message,direct_mention,mention', function (bot, message) {
  controller.storage.users.get(message.user, function () {
    bot.startConversation(message, function (err, convo) {
      var user = {};

      if (!err) {
        convo.ask(BOT_RESPONSES.EDIT_NAME, function (res, convo) {
          user = {
            id: message.user,
            team: message.text,
            name: res.text
          };
          convo.next();
        });
        convo.ask(BOT_RESPONSES.EDIT_GITHUB_USERNAME, function (res, convo) {
          var transcript = convo.transcript;
          user.gitHubName = transcript[3].text;
          controller.storage.users.save(user);
          convo.next();
        });
        convo.say(BOT_RESPONSES.EDIT_FAREWELL, function (res, convo) {
          convo.stop();
        });
      }
    });
  });
});
//# sourceMappingURL=edit.js.map