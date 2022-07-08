class DefenderProvider {
  constructor(serverless, options) {
    const tstring = { type: 'string '};
    serverless.configSchemaHandler.defineProvider('defender', {
      function: {
        properties: {
          name: tstring,
          path: tstring,
        }
      }
    })
  }
}

module.exports = DefenderProvider;