require('dotenv').config();
const router = require('express').Router();
const octokit = require('@octokit/rest')();
const controller = require('../controller/spawnController');
const Slack = require('slack-node');
const slack = new Slack();
slack.setWebhook(process.env.SLACK_WEBHOOK_URL);

const reminderMessage = require('../fixtures/reminderMessage');

module.exports = router.post('/', async(req, res, next) => {
  const forkee = req.body.forkee.owner.login;
  const forkedRepo = req.body.repository.name;

  await gitHubAuthentication();
  await commitReminder(forkee, forkedRepo)();
});

const commitReminder = (forkee, forkedRepo) => () => {
  octokit.activity
    .listRepoEvents({
      owner: forkee,
      repo: forkedRepo
    })
    .then(({ data }) => {
      const commits = data.filter(e => e.payload.commits.length > 0);
      const hasCommitted = commits.length > 0;

      if(!hasCommitted) {
        controller.storage.users.find(
          { gitHubName: forkee },
          (error, users) => {
            const message = reminderMessage(users[0].id, forkedRepo);
            slack.webhook(message, (err, response) => {});
          }
        );
        setTimeout(commitReminder(forkee, forkedRepo), 1800000);

      } else {
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
