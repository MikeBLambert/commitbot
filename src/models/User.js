const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  slackUserName: {
    type: String,
    required: true
  },
  gitHubUserName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'TA'],
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
