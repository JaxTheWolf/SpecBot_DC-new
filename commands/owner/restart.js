const logger = require(`../../utils/logger`)
const { Command } = require(`discord.js-commando`)
const { exec } = require(`shelljs`)
const { genErrorEmbed, genSuccessEmbed } = require(`../../utils/embeds`)

module.exports = class RestartCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`reboot`],
      description: `Restarts the systemd service or the nodejs process`,
      examples: [`restart`],
      group: `owner`,
      memberName: `restart`,
      name: `restart`,
      ownerOnly: true
    })
  }
  run (msg) {
    let embed
    if (process.platform !== `win32`) {
      exec(`cd scripts/ && sh service.sh restart`, (code, stdout, stderr) => {
        if (code !== 0) {
          logger.error(`Tried restarting, got an error: '${stderr}'`)
          embed = genErrorEmbed(`An error has occurred.`, stderr, msg)
        } else {
          embed = genSuccessEmbed(`✅`, `Restarting...`, msg)
        }
        return msg.say(embed)
      })
    }
  }
}
