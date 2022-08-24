const Autotask = require('defender-autotask-client');
const Sentinel = require('defender-sentinel-client');

function getAutotaskClient() {
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;
  const client = new Autotask.AutotaskClient({ apiKey, apiSecret });
  return client;
}

function getSentinelClient() {
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;
  const client = new Sentinel.SentinelClient({ apiKey, apiSecret });
  return client;
}

function logMessage(serverless, message) {
  serverless.cli.log(`defender: ${message}`);
}

module.exports = {
  logMessage,
  getAutotaskClient,
  getSentinelClient
};
