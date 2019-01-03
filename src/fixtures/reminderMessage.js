// let message = {
//   username: 'CommitBot',
//   text: 'Don\'t forget to commit!',
//   icon_emoji: ':octopus:'
// };

// module.exports = message;

const reminderMessage = (user, forkedRepo) => {
  return (
    {
      username: 'CommitBot',
      text: `Don't forget to commit to ${forkedRepo}`,
      icon_emoji: ':octopus:',
      channel: user
    }
  );
};

module.exports = reminderMessage;
