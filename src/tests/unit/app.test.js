require('dotenv').config();
const app = require('../../routes/app');
const request = require('supertest');

describe('app', () => {
  it('sends authorization to slack', () => {
    const authResponse = {
      token: 'Jhj5dZrVaK7ZwHHjRyZWjbDl',
      challenge: '3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P',
      type: 'url_verification'
    };
    return request(app)
      .post('/commitbot')
      .send(authResponse)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.text).toEqual(authResponse.challenge);
      });
  });

  it('responds asking for a user\'s github username when the user sends "register" as text to commitbot', () => {
    const message = {
      event: {
        text: 'register'
      }
    };
    return request(app)
      .post('/commit')
      .send(message)
      .then(res => {
        expect(res.text).toEqual('Hi there! :wave: I\'m a special bot designed to help you get over your fear of commitment. Committing on GitHub is super important. Let\'s get started! What is your GitHub username?');
      });
  });
});
