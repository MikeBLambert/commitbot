const controller = require('./spawnController');
const BOT_RESPONSES = require('../fixtures/botResponses');

controller.hears(
  ['register me'],
  'direct_message,direct_mention,mention',
  (bot, message) => {
    controller.storage.users.get(message.user, (err, user) => {
      if(user && user.name) {
        bot.reply(message, 'Hello ' + user.name + '!! It looks like you\'ve already registered. Please type \'edit profile\' if you\'d like to make some changes to your profile.');
      } else {
        bot.startConversation(message, (err, convo) => {
          let user = {};
          if(!err) {
            convo.ask(BOT_RESPONSES.REGISTRATION_NAME, (res, convo) => {
              user = {
                id: message.user,
                team: message.text,
                name: res.text
              };
              convo.next();
            });
            convo.ask(
              BOT_RESPONSES.REGISTRATION_GITHUB_USERNAME,
              (res, convo) => {
                const { transcript } = convo;
                user.gitHubName = transcript[3].text;
                controller.storage.users.save(user);
                convo.next();
              }
            );
            convo.say(BOT_RESPONSES.REGISTRATION_FAREWELL, (res, convo) => {
              convo.stop();
            });
          }
        });
      }
    });
  }
);
