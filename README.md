# _CommitBot_

### _An application to help your development team get over their fear of commitment, January 2019_

### By _**Mike Lambert**_

## Description

_Through GitHub and Slack integrations, this application sends periodic Slack reminders to contributors who have forked a GitHub repository, but haven't yet added a commit. By default, it will send a message to the contributor ever 30 minutes until a commit is sent._

## Setup Instructions

* Clone this repository and install dependencies with `npm install` command.
* You will need to set up a slackbot, slack webhooks, and github webhooks. See instructions below:

## Slack Setup

### Slack App

* Create a new application in slack in the workspace where you would like CommitBot to operate. Instructions for creating a Slack application can be found [here](https://api.slack.com/slack-apps)

### Bot Setup

_CommitBot relies on a SlackBot to register users and associate their Slack account with their GitHub account. Please refer to Slack's [instructions](https://api.slack.com/bot-users) as needed. You will also need to use a product/service such as [ngrok](https://ngrok.com/) in order to authorize the bot. These instructions assume that you are using ngrok._

* Add a new Bot User with the name "CommitBot".
* Start up the application using `npm start` command (or `npm start:watch` command for development mode).
* Start ngrok with forwarding going to the port on which the application is running. This is 4000 by default, unless you configure a difference port in your .env file (see envexample).
* In Slack, set up the Events API per their [instructions](https://api.slack.com/bot-users) using the ngrok forwarding URL + 'oauth' (i.e. it should look something like 'https://761b0cd8.ngrok.io/oauth') as the Request URL when enabling events. If the application is running on the same port as the ngrok forwarding URL, the Request URL should be verified.
* Subscribe CommitBot to `app_mention` and `message.channels`.
* Proceed installing the application per Slack's instructions and copy and past the Bot User OAuth Access Token into the .env file

### Incoming Webhooks

* In order to allow for messages to be posted to slack from an external source, you will need to configure your app to accept incoming webhooks. You can find instructions for setting up an incoming webhook [here](https://api.slack.com/incoming-webhooks).
* Copy and paste your app's Webhook URL into a .env file per `envexample` file included in this repo.

## GitHub Setup

### GitHub Authorization (to avoid rate-limits)

* With your GitHub user account, add a new [OAuth app](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/) and copy and paste the Client ID and Client Secret in the .env file per the `envexample`.

### Deploy Application

* Deploy application using the hosting service of your choice.

### GitHub WebHooks Setup

_For each new repo that you would like have commit reminders sent, you will need to add the deployed URL._

* In the settings section of the repo, go to `Webhooks` and add the deployed URL into the `Payload URL` section.
* Switch Content Type to `application/json`.
* Set the events that you would like to trigger this webhook to `Forks`.
* Now each time that a registered user forks this repo, CommitBot will send them a slack message once every 15 minutes until they make an initial commit.

## Registering Users

_Users register with CommitBot by sending it direct messages:_

* Message "register me" to @CommitBot to register a new user.
* Message "edit profile" to @CommitBot to edit a user's profile.

## Support and contact details

_Please feel free to reach out to me at mlamb128@gmail.com_

## Technologies Used

_Node.js with Express, as well as Botkit and Octokit._

### License

*MIT*
Copyright (c) 2018 **_Michael B Lambert_**