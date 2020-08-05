const color = require(`../../utils/randomhex`)
const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require(`discord.js`)

module.exports = class UserInfoCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`uinfo`, `user_info`, `u_info`],
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `member`,
          prompt: `Whose info would you want to see?`,
          type: `member`
        }
      ],
      description: `Sends info about you or the tagged user (if any)`,
      examples: [`userinfo @user0000`],
      group: `info`,
      guildOnly: true,
      memberName: `userinfo`,
      name: `userinfo`
    })
  }

  run (msg, { member }) {
    const statuses = {
      dnd: `Do Not Disturb`,
      idle: `Idle`,
      offline: `Offline/Invisible`,
      online: `Online`
    }
    let uMember, uAvatar

    if (member === ``) {
      uMember = msg.guild.members.cache.get(msg.author.id)
      uAvatar = msg.author.displayAvatarURL({ size: 2048 })
      console.log(uMember)
    } else {
      uMember = member
      uAvatar = member.user.displayAvatarURL({ size: 2048 })
    }

    const embed = new MessageEmbed()
      .addField(`Created`, `${uMember.user.createdAt.toLocaleString()}`, true)
      .addField(`Joined`, `${uMember.joinedAt.toLocaleString()}`, true)
    // FIX THIS      .addField(`Nickname`, uMember.nickname === null ? `None` : uMember.nickname, true)
      .addField(`Roles [${uMember.roles.cache.size - 1}]`, `${uMember.roles.cache.size <= 1 ? `none` : uMember.roles.cache.map(r => r).slice(1).join(` `)}`, true)
      .addField(`Status`, ` ${statuses[uMember.presence.status]}`, true)
      .setAuthor(uMember.user.username, this.client.user.displayAvatarURL)
      .setColor(color())
      .setDescription(uMember)
      .setFooter(`ID: ${uMember.id}`)
      .setThumbnail(uAvatar)
      .setTimestamp(new Date())
    return msg.say({ embed })
  }
}
