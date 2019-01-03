require('dotenv').config();
const router = require('express').Router();
const octokit = require('@octokit/rest')();
const Slack = require('slack-node');
const slack = new Slack();

slack.setWebhook(process.env.SLACK_WEBHOOK_URL);

const payload = {
  channel: '#general',
  username: 'webhookbot',
  text: 'This is posted to #general and comes from a bot named webhookbot.',
  icon_emoji: ':ghost:'
};

const listForkActivity = (forkee, forkedRepo) => () => {
  octokit.activity
    .listRepoEvents({
      owner: forkee,
      repo: forkedRepo
    })
    .then(({ data, headers, status }) => {
      const commits = data.filter(e => e.payload.commits.length > 0);
      if (commits.length === 0) {
        slack.webhook(payload, (err, res) => {});
        setTimeout(listForkActivity(forkee, forkedRepo), 5000);
      } else if (commits.length > 0) {
        return;
      }
    });
};

const gitHubAuthentication = () => {
  octokit.authenticate({
    type: 'oauth',
    key: process.env.GITHUB_AUTH_KEY,
    secret: process.env.GITHUB_AUTH_SECRET
  });
};

module.exports = router.post('/', async (req, res, next) => {
  const forkee = req.body.forkee.owner.login;
  const forkedRepo = req.body.repository.name;

  await gitHubAuthentication();
  await listForkActivity(forkee, forkedRepo)();
});
