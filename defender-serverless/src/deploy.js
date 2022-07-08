const Autotask = require('defender-autotask-client');

class DefenderDeploy {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'deploy:deploy': this.deploy.bind(this)
    };
  }

  async deploy() {
    console.log('Defender Deploy');
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;
    const client = new Autotask.AutotaskClient({ apiKey, apiSecret });
    const serverless = this.serverless;
    const functions = serverless.service.functions;
    for (const [_fname, fn] of Object.entries(functions)) {
      const autotask = await client.create({
        name: fn.name,
        trigger: { type: 'webhook' },
        encodedZippedCode: await client.getEncodedZippedCodeFromFolder(fn.path),
        paused: false,
      });
      console.log(`Created autotask ${autotask.autotaskId}`);
    }
    
  }
}

module.exports = DefenderDeploy;