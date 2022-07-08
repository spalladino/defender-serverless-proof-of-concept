const { logMessage, getAutotaskClient } = require('./util');

class DefenderDeploy {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'deploy:deploy': this.deploy.bind(this)
    };
  }

  async deploy() {
    const serverless = this.serverless;
    logMessage(serverless, 'Running Defender Deploy');
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
}

module.exports = DefenderDeploy;