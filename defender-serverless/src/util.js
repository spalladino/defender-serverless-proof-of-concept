function logMessage(serverless, message) {
  serverless.cli.log(`defender: ${message}`);
}

module.exports = {
  logMessage
};
