const { Command } = require(`discord.js-commando`)
const { genErrorEmbed } = require(`../../utils/embeds`)

module.exports = class PointsCommand extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          default: ``,
          error: `Invalid user mention. Please try again.`,
          key: `member`,
          prompt: `Whose info would you want to see?`,
          type: `member`
        }
      ],
      description: `Shows how many points you have`,
      examples: [`points`, `points @user#0000`],
      group: `economy`,
      guildOnly: true,
      memberName: `points`,
      name: `points`
    })
  }
  run (msg, { member }) {
    const user = member.user || msg.author
    let send
    try {
      const score = this.client.getScore.get(user.id, msg.guild.id)
      send = `${user.username} currently has ${score.points} points (level ${score.level}) and ${score.money} Spec$!`
    } catch (e) {
      send = genErrorEmbed(`An error has occurred.`, e.message, msg)
    }
    return msg.say(send)
  }
}
