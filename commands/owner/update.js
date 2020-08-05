const logger = require(`../../utils/logger`)
const { Command } = require(`discord.js-commando`)
const { exec } = require(`shelljs`)
const { genErrorEmbed } = require(`../../utils/embeds`)

module.exports = class UpdateCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Updates the bot using \`git pull ...\``,
      examples: [`update`],
      group: `owner`,
      memberName: `update`,
      name: `update`,
      ownerOnly: true
    })
  }
  run (msg) {
    let message
    if (process.platform !== `win32`) {
      exec(`cd scripts/ && sh update.sh | tail -10`, (code, stdout, stderr) => {
        if (code !== 0) {
          logger.error(`Tried updating, got an error: '${stderr}'`)
          message = genErrorEmbed(`An error has occurred.`, stderr, msg)
        } else {
          message = `...\n${stdout}`
        }
        return msg.say(message, { code: `asciidoc` })
      })
    }
  }
}
