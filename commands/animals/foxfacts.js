const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../utils/jsonAPIs`)

module.exports = class FoxFactCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [
        `foxfact`,
        `faxfact`
      ],
      description: `Sends a random fox fact`,
      examples: [`foxfact`],
      group: `animals`,
      memberName: `foxfacts`,
      name: `foxfact`
    })
  }
  run (msg) {
    return fetchText(msg, `🦊`, `https://some-random-api.ml/facts/fox`, `fact`)
  }
}
