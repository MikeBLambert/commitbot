"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var router = require('express').Router();

var octokit = require('@octokit/rest')();

var controller = require('../controller/spawnController');

var Slack = require('slack-node');

var slack = new Slack();
slack.setWebhook(process.env.SLACK_WEBHOOK_URL);

var reminderMessage = require('../fixtures/reminderMessage');

module.exports = router.post('/',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var forkee, forkedRepo;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            forkee = req.body.forkee.owner.login;
            forkedRepo = req.body.repository.name;
            _context.next = 4;
            return gitHubAuthentication();

          case 4:
            _context.next = 6;
            return commitReminder(forkee, forkedRepo)();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

var commitReminder = function commitReminder(forkee, forkedRepo) {
  return function () {
    octokit.activity.listRepoEvents({
      owner: forkee,
      repo: forkedRepo
    }).then(function (_ref2) {
      var data = _ref2.data;
      var commits = data.filter(function (e) {
        return e.payload.commits.length > 0;
      });
      var hasCommitted = commits.length > 0;

      if (!hasCommitted) {
        controller.storage.users.find({
          gitHubName: forkee
        }, function (error, users) {
          var message = reminderMessage(users[0].id, forkedRepo);
          slack.webhook(message, function (err, response) {});
        });
        setTimeout(commitReminder(forkee, forkedRepo), 900000);
      } else {
        return;
      }
    });
  };
};

var gitHubAuthentication = function gitHubAuthentication() {
  octokit.authenticate({
    type: 'oauth',
    key: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET
  });
};
//# sourceMappingURL=app.js.map