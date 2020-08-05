const color = require(`../../utils/randomhex`)
const logger = require(`../../utils/logger`)
const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require(`discord.js`)
const { sendSuccessEmbed } = require(`../../utils/embeds`)

module.exports = class ReportCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`repo`, `specbotreport`, `spreport`, `sprepo`],
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `user`,
          prompt: `Who would you like to report?`,
          type: `user`
        },
        {
          default: ``,
          key: `reason`,
          prompt: `What's the reason?`,
          type: `string`
        },
        {
          default: ``,
          error: `Reply with yes/no.`,
          key: `confirm`,
          oneOf: [`yes`, `no`],
          prompt: `ABUSE OF THIS COMMAND CAN RESULT IN A PUNISHMENT! Do you still want to proceed? (yes if you understand, no otherwise.)`,
          type: `string`
        }
      ],
      description: `Reports a user to the server owner`,
      examples: [`report @user#0000 "Hate messages" no`, `report @user0000 "no" yes`],
      group: `main`,
      memberName: `report`,
      name: `report`
    })
  }

  run (msg, { user, reason, confirm }) {
    if (confirm === `no`) {
      return msg.reply(`Cancelled command.`)
    } else {
      const embed = new MessageEmbed()
        .addField(`User`, `${user.tag}`, true)
        .addField(`Reason`, `${reason}`, true)
        .addField(`Guild`, `${msg.guild.name}`, true)
        .addField(`Channel`, `${msg.channel.name}`, true)
        .addField(`If you feel that this report is unnecessary and/or you believe the command has been abused`, ` you may want to "punish" the author (${msg.author.tag}).`, true)
        .setAuthor(`Report from ${msg.author.username}`, msg.author.displayAvatarURL)
        .setColor(color())
        .setDescription(`Remember to punish the offending user if needed!`)
        .setFooter(new Date(), user.displayAvatarURL)

      return msg.guild.owner.user.send({ embed })
        .then(sendSuccessEmbed(`User \`${user.tag}\` has been reported to the server owner!`, ``, msg))
        .catch(m => logger.warn(m))
    }
  }
}
