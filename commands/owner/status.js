const logger = require(`../../utils/logger`)
const { Command } = require(`discord.js-commando`)
const { exec } = require(`shelljs`)
const { genErrorEmbed, genSuccessEmbed } = require(`../../utils/embeds`)

module.exports = class RestartCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Shows the status of the \`bot\` systemd service (Linux only, also systemd only)`,
      examples: [`status`],
      group: `owner`,
      memberName: `status`,
      name: `status`,
      ownerOnly: true
    })
  }
  run (msg) {
    let message
    if (process.platform !== `win32`) {
      exec(`cd scripts/ && sh service.sh status`, (code, stdout, stderr) => {
        if (code !== 0) {
          logger.error(`Tried getting systemd status, got an error: '${stderr}'`)
          message = genErrorEmbed(`An error has occurred.`, stderr, msg)
        } else {
          message = `...\n${stdout}`
        }
        return msg.say(message, { code: `asciidoc` })
      })
    }
  }
}
