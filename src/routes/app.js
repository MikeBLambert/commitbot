const express = require('express');
const app = express();
const request = require('request');
// const octokit = require('@octokit/rest')()
// const fetch = require('node-fetch');
require('dotenv').config();

app.use(express.json());

app.post('/commitbot', (req, res) => {
  let status = 200;
  const { challenge } = req.body;
  if (challenge) return res.status(status).send(challenge);

  var data = {form: {
    token: process.env.SLACK_AUTH_TOKEN,
    channel: "#general",
    text: 'Hi there! :wave: I\'m a special bot designed to help you get over your fear of commitment. Committing on GitHub is super important. Let\'s get started! What is your GitHub username?'
  }};
  const message = req.body.event.text;
  if(message.includes('register')) {
    request.post('https://slack.com/api/chat.postMessage', data, () => {
      res.json();
    })
  }
});

module.exports = app;
