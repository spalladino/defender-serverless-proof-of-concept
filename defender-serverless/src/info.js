class DefenderInfo {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'info:info': this.info.bind(this)
    };
  }

  async info() {
    console.log('Defender Info');
  }
}

module.exports = DefenderInfo;