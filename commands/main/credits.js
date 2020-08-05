const logger = require(`../../utils/logger`)
const { Command } = require(`discord.js-commando`)
const { owner } = require(`../../configs/conf.json`)

module.exports = class CreditsCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`creds`, `authors`],
      description: `Credits creators`,
      examples: [`credits`],
      group: `main`,
      memberName: `credits`,
      name: `credits`
    })
  }

  run (msg) {
    return msg.say(`SpecBot is coded by Roman Lubij, ${this.client.users.resolve(owner[0]).tag} and Designed by Jonne-Patrik Savimäki, ${this.client.users.resolve(owner[1]).tag}, artwork by ${this.client.users.resolve(`193724755310804992`).tag}`)
      .then(msg.say(`Homepage: https://jaxthewolf.github.io/SpecBot_DC/`))
      .catch(m => logger.warn(m))
  }
}
