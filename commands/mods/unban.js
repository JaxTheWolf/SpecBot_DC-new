const logger = require(`../../utils/logger`)
const { Command } = require(`discord.js-commando`)
const { genErrorEmbed, genSuccessEmbed } = require(`../../utils/embeds`)

module.exports = class KickCommand extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          default: ``,
          error: `Invalid user mention (or ID). Please try again.`,
          key: `user`,
          prompt: `Which member would you like to unban?`,
          type: `user`
        },
        {
          default: `Unbanned by SpecBot.`,
          key: `reason`,
          prompt: `What should the reason be?`,
          type: `string`
        }
      ],
      clientPermissions: [`BAN_MEMBERS`],
      description: `Unban any members you wish`,
      examples: [`unban userID Why not`],
      group: `mods`,
      guildOnly: true,
      memberName: `unban`,
      name: `unban`,
      userPermissions: [`BAN_MEMBERS`]
    })
  }

  run (msg, { user, reason }) {
    return msg.guild.members.unban(user.id, reason).then(u => {
      logger.info(`Unbanned user '${u.tag}' from guild '${msg.guild.name}'.`)
      return msg.say(genSuccessEmbed(`🔨 Unbanned user **${user.tag}**`, `Reason: **${reason}**`, msg))
    }).catch(e => {
      logger.warn(`Couldn't unban member '${user.user.tag}' from guild '${msg.guild.name}'. (${e.message})`)
      return msg.say(genErrorEmbed(`❌ Couldn't unban member **${user.user.tag}**`, `Reason: **${e.message}**`, msg))
    })
  }
}
