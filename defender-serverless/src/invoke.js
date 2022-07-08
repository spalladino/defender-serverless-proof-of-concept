const { logMessage, getAutotaskClient } = require("./util");

class DefenderInvoke {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'invoke:invoke': this.invoke.bind(this)
    };
  }

  async invoke() {
    const serverless = this.serverless;
    const options = this.options;
    logMessage(serverless, 'Defender Invoke');
    const slsfn = serverless.service.functions[options.f || options.function];
    if (!slsfn) throw new Error(`Function ${slsfname} not defined`);
    const functionName = slsfn.name;
    const payload = JSON.parse(options.d || options.data);
    const client = getAutotaskClient();
    const existing = await client.list().then(r => r.items);
    const match = existing.find(e => e.name === functionName);
    if (!match) throw new Error(`Function '${functionName}' not found on Defender`);
    const response = await client.runAutotask(match.autotaskId, payload);
    console.log(response);
  }
}

module.exports = DefenderInvoke;