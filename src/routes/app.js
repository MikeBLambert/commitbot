require('dotenv').config();
const router = require('express').Router();
const octokit = require('@octokit/rest')();
const Slack = require('slack-node');
const slack = new Slack();
slack.setWebhook(process.env.SLACK_WEBHOOK_URL);

const Botkit = require('botkit');
const mongoStorage = require('botkit-storage-mongo')({
  mongoUri: process.env.MONGO_URI
});
const controller = Botkit.slackbot({
  debug: false,
  storage: mongoStorage
});

let message = {
  channel: '',
  username: 'CommitBot',
  text: 'Looks like you still need to commit.',
  icon_emoji: ':octopus:'
};

const listForkActivity = (forkee, forkedRepo) => () => {
  octokit.activity
    .listRepoEvents({
      owner: forkee,
      repo: forkedRepo
    })
    .then(({ data }) => {
      const commits = data.filter(e => e.payload.commits.length > 0);
      const hasCommitted = commits.length > 0;

      if (!hasCommitted) {
        controller.storage.users.find(
          { gitHubName: forkee },
          (error, users) => {
            message.channel = users[0].id;
          }
        );

        slack.webhook(message, (err, res) => {});
        setTimeout(listForkActivity(forkee, forkedRepo), 5000);
      } else if (hasCommitted) {
        return;
      }
    });
};

const gitHubAuthentication = () => {
  octokit.authenticate({
    type: 'oauth',
    key: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET
  });
};

module.exports = router.post('/', async (req, res, next) => {
  const forkee = req.body.forkee.owner.login;
  const forkedRepo = req.body.repository.name;

  await gitHubAuthentication();
  await listForkActivity(forkee, forkedRepo)();
});
