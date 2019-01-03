"use strict";

// let message = {
//   username: 'CommitBot',
//   text: 'Don\'t forget to commit!',
//   icon_emoji: ':octopus:'
// };
// module.exports = message;
var reminderMessage = function reminderMessage(user, forkedRepo) {
  return {
    username: 'CommitBot',
    text: "Don't forget to commit to ".concat(forkedRepo),
    icon_emoji: ':octopus:',
    channel: user
  };
};

module.exports = reminderMessage;
//# sourceMappingURL=reminderMessage.js.map