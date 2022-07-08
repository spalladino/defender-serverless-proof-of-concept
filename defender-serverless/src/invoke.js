class DefenderInvoke {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'invoke:invoke': this.invoke.bind(this)
    };
  }

  async invoke() {
    console.log('Defender Invoke');
  }
}

module.exports = DefenderInvoke;