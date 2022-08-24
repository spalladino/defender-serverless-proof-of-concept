const { logMessage, getAutotaskClient, getSentinelClient } = require('./util');

class DefenderDeploy {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'deploy:deploy': this.deploy.bind(this)
    };
  }

  async deploySentinels() {
    const serverless = this.serverless;
    const client = getSentinelClient();
    const existing = await client.list().then(r => r.items);
    const sentinels = serverless.service.resources.sentinels;

    for (const [_sname, sentinel] of Object.entries(sentinels)) {
      const match = existing.find(e => e.name === sentinel.name);
      if (match) {
        logMessage(serverless, `Updating sentinel '${match.name}' (${match.subscriberId})`);
      } else {
        logMessage(serverless, `Creating sentinel '${sentinel.name}'`);
      }
    }
  }

  async deployFunctions() {
    const client = getAutotaskClient();
    const existing = await client.list().then(r => r.items);
    const functions = serverless.service.functions;
    for (const [_fname, fn] of Object.entries(functions)) {
      const match = existing.find(e => e.name === fn.name);
      if (match) {
        await client.updateCodeFromFolder(match.autotaskId, fn.path);
        logMessage(serverless, `Updated autotask code '${match.name}' (${match.autotaskId})`);
      } else {
        const autotask = await client.create({
          name: fn.name,
          trigger: { type: 'webhook' },
          encodedZippedCode: await client.getEncodedZippedCodeFromFolder(fn.path),
          paused: false,
        });
        logMessage(serverless, `Created autotask '${match.name}' (${autotask.autotaskId})`);
      }
    }
  }

  async deploy() {
    const serverless = this.serverless;
    logMessage(serverless, 'Running Defender Deploy');
    // await this.deployFunctions();
    await this.deploySentinels();
  }
}

module.exports = DefenderDeploy;