// const Botkit = require('botkit');

// const mongoStorage = require('botkit-storage-mongo')({
//   mongoUri: process.env.MONGO_URI
// });
// const controller = Botkit.slackbot({
//   debug: false,
//   storage: mongoStorage
// });

// controller
//   .spawn({
//     token: process.env.BOT_AUTH_TOKEN
//   })
//   .startRTM(function(err) {
//     if (err) {
//       throw new Error(err);
//     }
//   });

// controller.hears(
//   ['registration'],
//   'direct_message,direct_mention,mention',
//   (bot, message) => {
//     controller.storage.users.get(message.user, (err, user) => {
//       if (user && user.name) {
//         bot.reply(message, 'Hello ' + user.name + '!!');
//       } else {
//         bot.startConversation(message, (err, convo) => {
//           let user = {};
//           if (!err) {
//             convo.ask(
//               "Hi There! I'm a special bot that's supposed to help you get over your fear of commitment! Let's get started by getting to know each other a bit. What's your name?",
//               (res, convo) => {
//                 user = {
//                   id: message.user,
//                   team: message.text,
//                   name: res.text
//                 };
//                 convo.next();
//               }
//             );
//             convo.ask(
//               'Cool, cool...how about your GitHub username?',
//               (res, convo) => {
//                 const { transcript } = convo;
//                 user.gitHubName = transcript[3].text;
//                 controller.storage.users.save(user);
//                 convo.next();
//               }
//             );
//             convo.say(
//               "Boom! That's all I need. We're all set.",
//               (res, convo) => {
//                 convo.stop();
//               }
//             );
//           }
//         });
//       }
//     });
//   }
// );

// controller.hears(
//   ['http'],
//   'direct_message,direct_mention,mention',
//   (bot, message) => {
//     // octokit.repos
//     //   .getForOrg({
//     //     org: 'octokit',
//     //     type: 'public'
//     //   })
//     //   .then(({ data, headers, status }) => {
//     //     console.log(data);
//     //   });
//     bot.reply(message, 'yo yo yo');

//   }
// );
