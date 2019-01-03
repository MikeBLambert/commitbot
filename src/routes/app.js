const router = require('express').Router();
const octokit = require('@octokit/rest')();
const Slack = require('slack-node');
const slack = new Slack();

slack.setWebhook(
  'https://hooks.slack.com/services/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'
);
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
      if(commits.length === 0) {
        slack.webhook(payload, (err, res) => {});
        setTimeout(listForkActivity(forkee, forkedRepo), 5000);
      } else if(commits.length > 0) {
        return;
      }
    });
};

const gitHubAuthentication = () => {
  octokit.authenticate({
    type: 'oauth',
    key: '11076cacdf559a576421',
    secret: '5d01c66c370b271f27d5e287fcc72d4a2a5adaef'
  });
};

module.exports = router.post('/', async(req, res, next) => {
  const forkee = req.body.forkee.owner.login;
  const repo = req.body.repository.name;

  await gitHubAuthentication();
  await listForkActivity(forkee, forkedRepo)();
});
