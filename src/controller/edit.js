const controller = require('./spawnController');
const BOT_RESPONSES = require('../fixtures/botResponses');

controller.hears(
  ['edit profile'],
  'direct_message,direct_mention,mention',
  (bot, message) => {
    controller.storage.users.get(message.user, () => {
      bot.startConversation(message, (err, convo) => {
        let user = {};
        if (!err) {
          convo.ask(BOT_RESPONSES.EDIT_NAME, (res, convo) => {
            user = {
              id: message.user,
              team: message.text,
              name: res.text
            };
            convo.next();
          });
          convo.ask(
            BOT_RESPONSES.EDIT_GITHUB_USERNAME,
            (res, convo) => {
              const { transcript } = convo;
              user.gitHubName = transcript[3].text;
              controller.storage.users.save(user);
              convo.next();
            }
          );
          convo.say(BOT_RESPONSES.EDIT_FAREWELL, (res, convo) => {
            convo.stop();
          });
        }
      });
    });
  }
);
