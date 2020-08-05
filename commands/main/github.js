const logger = require(`../../utils/logger`)
const { Command } = require(`discord.js-commando`)
const { repository } = require(`../../package.json`)

module.exports = class GitHubCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`gh`, `gith`],
      description: `Show the GitHub page of the bot`,
      examples: [`github`],
      group: `main`,
      memberName: `github`,
      name: `github`
    })
  }

  run (msg) {
    const repo = repository.url.replace(`git+`, ``).replace(`.git`, ``)
    return msg.say(`GitHub repository can be found here: ${repo}`)
      .then(msg.say(`Homepage can be found here: https://JaxTheWolf.github.io/SpecBot_DC-new`))
      .catch(m => logger.warn(m))
  }
}
