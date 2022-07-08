const DefenderProvider = require('./src/provider');
const DefenderDeploy = require('./src/deploy');
const DefenderInfo = require('./src/info');
const DefenderInvoke = require('./src/invoke');

class ServerlessPlugin {
  constructor(serverless) {
    this.serverless = serverless;
    this.provider = this.serverless.setProvider('defender', DefenderProvider);

    this.serverless.pluginManager.addPlugin(DefenderDeploy);
    this.serverless.pluginManager.addPlugin(DefenderInfo);
    this.serverless.pluginManager.addPlugin(DefenderInvoke);
  }
}

module.exports = ServerlessPlugin;