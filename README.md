# _CommitBot_

## _An application to remind your team to commit, January 2019_

## By _**Mike Lambert**_

## Description

_Through GitHub and Slack integrations, this application sends regular Slack commit reminders to GitHub contributors who have forked a repository._

## Setup/Installation Requirements

* Clone this repository and install dependencies with `npm install` command.
* You will need to set up a slackbot, slack webhooks, and github webhooks. See instructions below:

## Slack Setup

### Slack App

* Create a new application in slack. Instructions for creating a Slack application can be found [here](https://api.slack.com/slack-apps)

### Incoming Webhooks

* In order to allow for messages to be posted to slack from an external source, you will need to configure your app to accept incoming webhooks. You can find instructions for setting up an incoming webhook [here](https://api.slack.com/incoming-webhooks).
* Copy and paste your app's Webhook URL into a .env file per `envexample` file included in this repo.
