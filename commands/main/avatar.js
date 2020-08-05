const color = require(`../../utils/randomhex`)
const { Command } = require(`discord.js-commando`)
const { logger } = require(`winston`)
const { MessageEmbed } = require(`discord.js`)

module.exports = class AvatarCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`pfp`],
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `user`,
          prompt: `Which user's avatar would you like to see?`,
          type: `user`
        }
      ],
      description: `Shows your or mentioned user's avatar`,
      examples: [`avatar @oko123#8509`],
      group: `main`,
      memberName: `avatar`,
      name: `avatar`
    })
  }

  run (msg, { user }) {
    const embed = new MessageEmbed()
      .setColor(color())

    user === ``
      ? embed.setImage(msg.author.displayAvatarURL({ size: 2048 }))
      : embed.setImage(user.displayAvatarURL({ size: 2048 }))
    msg.channel.send({ embed })
      .catch(m => logger.warn(m))
  }
}
