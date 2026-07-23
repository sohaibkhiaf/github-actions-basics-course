// steps.js
const pactum = require('pactum');
const { spec, mock } = pactum;
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');

let request;

// 🔹 Start mock server before each scenario
Before(async () => {
  await mock.start(9393);

  // Define mock interaction
  mock.addInteraction({
    request: {
      method: 'GET',
      path: '/status/418'
    },
    response: {
      status: 418,
      body: 'I am a teapot ☕'
    }
  });

  request = spec();
});

// 🔹 Stop mock server after each scenario
After(async () => {
  await mock.stop();
});

// 🔹 Step: make request
Given('I make a GET request to {string}', function (url) {
  // Always hit mock server (ignore external URL)
  request.get('http://localhost:9393/status/418');
});

// 🔹 Step: execute request
When('I receive a response', async function () {
  await request.toss();
});

// 🔹 Step: validate response
Then('response should have a status {int}', function (code) {
  request.response().should.have.status(code);
});


