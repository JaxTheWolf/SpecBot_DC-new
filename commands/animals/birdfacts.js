const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../utils/jsonAPIs`)

module.exports = class BirdFactCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [
        `birbfact`,
        `burbfact`
      ],
      description: `Sends a random bird fact`,
      examples: [`birdfact`],
      group: `animals`,
      memberName: `birdfacts`,
      name: `birdfact`
    })
  }
  run (msg) {
    return fetchText(msg, `🐦`, `https://some-random-api.ml/facts/bird`, `fact`)
  }
}
