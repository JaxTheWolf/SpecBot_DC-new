const logger = require(`../../utils/logger`)
const { Command } = require(`discord.js-commando`)
const { genErrorEmbed, genSuccessEmbed } = require(`../../utils/embeds`)

module.exports = class BanCommand extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `member`,
          prompt: `Which member would you like to ban?`,
          type: `member`
        },
        {
          default: 0,
          error: `Make sure that the ban length is a number!`,
          key: `length`,
          max: 7,
          prompt: `How long would you like to ban the member for? (in days, if not specified, defaults to forever. Max is 7.)`,
          type: `integer`
        },
        {
          default: `Banned by SpecBot.`,
          key: `reason`,
          prompt: `What should the reason be?`,
          type: `string`
        }
      ],
      clientPermissions: [`BAN_MEMBERS`],
      description: `Ban any members you wish`,
      examples: [`ban @someUser#0000 7 Naughty words`],
      group: `mods`,
      guildOnly: true,
      memberName: `ban`,
      name: `ban`,
      userPermissions: [`BAN_MEMBERS`]
    })
  }

  run (msg, { member, length, reason }) {
    return member.ban({ days: length, reason: reason }).then(m => {
      logger.info(`Member '${m.user.tag}' has been banned from '${msg.guild.name}' for${length ? ` ${length} days` : `ever`} (Reason: ${reason})`)
      return msg.say(genSuccessEmbed(`🔨  Member **${m.user.tag}** was banned for **${length === 0 || length > 1 ? `${length} days` : `1 day`}**.`, `Reason: **${reason}**`, msg))
    }).catch(e => {
      logger.warn(`Couldn't ban member '${member.user.tag}' from guild '${msg.guild.name}'. (${e.message})`)
      return msg.say(genErrorEmbed(`❌ Couldn't ban member **${member.user.tag}**`, `Reason: **${e.message}**`, msg))
    })
  }
}
