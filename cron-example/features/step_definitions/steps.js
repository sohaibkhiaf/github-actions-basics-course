// steps.js
const pactum = require('pactum');
const { mock } = require('pactum');
const { Given, When, Then, Before } = require('@cucumber/cucumber');

let spec = pactum.spec();

Before(() => {
  spec = pactum.spec();

  // 🔥 Start mock server
  mock.addInteraction({
    request: {
      method: 'GET',
      path: '/status/418'
    },
    response: {
      status: 418,
      body: 'I am a teapot'
    }
  });
});

Given('I make a GET request to {string}', function (url) {
  // 👉 Redirect to local mock server
  spec.get('http://localhost:9393/status/418');
});

When('I receive a response', async function () {
  await spec.toss();
});

Then('response should have a status {int}', async function (code) {
  spec.response().should.have.status(code);
});

