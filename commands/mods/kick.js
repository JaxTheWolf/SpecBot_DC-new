const logger = require(`../../utils/logger`)
const { Command } = require(`discord.js-commando`)
const { genErrorEmbed, genSuccessEmbed } = require(`../../utils/embeds`)

module.exports = class KickCommand extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          error: `Invalid user mention. Please try again.`,
          key: `member`,
          prompt: `Which member would you like to kick?`,
          type: `member`
        },
        {
          default: `Kicked by SpecBot.`,
          key: `reason`,
          prompt: `What should the reason be?`,
          type: `string`
        }
      ],
      clientPermissions: [`KICK_MEMBERS`],
      description: `Kick any members you wish`,
      examples: [`kick @someUser#0000 Naughty words`],
      group: `mods`,
      guildOnly: true,
      memberName: `kick`,
      name: `kick`,
      userPermissions: [`KICK_MEMBERS`]
    })
  }

  run (msg, { member, reason }) {
    return member.kick(reason).then(m => {
      logger.info(`Kicked member '${m.user.tag}' from guild '${msg.guild.name} (Reason: '${reason}').`)
      return msg.say(genSuccessEmbed(`👢 Member **${m.user.tag}** was kicked.`, `Reason: **${reason}**`, msg))
    }).catch(e => {
      logger.warn(`Couldn't kick member '${member.user.tag}' from guild '${msg.guild.name}'. (${e.message})`)
      return msg.say(genErrorEmbed(`❌ Couldn't ban member **${member.user.tag}**`, `Reason: **${e.message}**`, msg))
    })
  }
}
