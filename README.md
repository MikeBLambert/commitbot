# _CommitBot_

## _An application to remind your team to commit, January 2019_

## By _**Mike Lambert**_

## Description

_Through GitHub and Slack integrations, this application sends regular Slack commit reminders to GitHub contributors who have forked a repository._

## Setup Instructions

* Clone this repository and install dependencies with `npm install` command.
* You will need to set up a slackbot, slack webhooks, and github webhooks. See instructions below:

## Slack Setup

### Slack App

* Create a new application in slack in the workspace where you would like CommitBot to operate. Instructions for creating a Slack application can be found [here](https://api.slack.com/slack-apps)

### Bot Setup

* CommitBot relies on a SlackBot to register users and associate their Slack account with their GitHub account. Add a Bot User per Slack's [instructions](https://api.slack.com/bot-users) and paste the
* 
### Incoming Webhooks

* In order to allow for messages to be posted to slack from an external source, you will need to configure your app to accept incoming webhooks. You can find instructions for setting up an incoming webhook [here](https://api.slack.com/incoming-webhooks).
* Copy and paste your app's Webhook URL into a .env file per `envexample` file included in this repo.


## GitHub Setup

# SETUP/INSTALLATION INSTRUCTIONS CURRENTLY UNDER CONSTRUCTION

## Support and contact details

_Please feel free to reach out to me at mlamb128@gmail.com_

## Technologies Used

_Node.js with Express, as well as Botkit and Octokit._

### License

*MIT*
Copyright (c) 2018 **_Michael B Lambert_**