const color = require(`../../utils/randomhex`)
const logger = require(`../../utils/logger`)
const { Command } = require(`discord.js-commando`)
const { genSimpleEmbed } = require(`../../utils/embeds`)

module.exports = class SayCommand extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          key: `title`,
          prompt: `What would you like the title to be?`,
          type: `string`
        },
        {
          key: `desc`,
          prompt: `What would you like the description to be?`,
          type: `string`
        }
      ],
      description: `Embeds whatever you specify`,
      examples: [`embed lul`],
      group: `main`,
      memberName: `embed`,
      name: `embed`
    })
  }

  run (msg, { title, desc }) {
    const send = [[title, desc]]
    if (msg.channel.type === `dm` || !msg.guild.me.hasPermission(`MANAGE_MESSAGES`)) {
      return msg.channel.send(genSimpleEmbed(send, color(), msg)).catch(m => logger.warn(m))
    } else {
      return msg.delete().then(msg.channel.send(genSimpleEmbed(send, color(), msg))).catch(m => logger.warn(m)
      )
    }
  }
}
