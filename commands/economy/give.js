const { Command } = require(`discord.js-commando`)
const { genErrorEmbed, genSuccessEmbed } = require(`../../utils/embeds`)

module.exports = class GiveCommand extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          error: `You can only give 1 Spec$ or more!`,
          key: `amount`,
          min: 1,
          prompt: `How many Spec$ would you like to give?`,
          type: `integer`
        },
        {
          error: `Invalid user mention. Please try again.`,
          key: `user`,
          prompt: `Who would you like to give these Spec$?`,
          type: `user`
        }
      ],
      description: `Gives someone x Spec$.`,
      examples: [`give 10 @user#0000`],
      group: `economy`,
      guildOnly: true,
      memberName: `give`,
      name: `give`
    })
  }
  run (msg, { amount, user }) {
    const authorScore = this.client.getScore.get(msg.author.id, msg.guild.id)
    const userScore = this.client.getScore.get(user.id, msg.guild.id) || {
      guild: msg.guild.id,
      id: `${msg.guild.id}-${user.id}`,
      level: 1,
      money: 5,
      points: 0,
      user: user.id
    }
    let embed
    if (authorScore.id === userScore.id) {
      embed = genErrorEmbed(`❌`, `You cannot give Spec$ to yourself!`, msg)
    }
    try {
      if (authorScore.money < amount) {
        embed = genErrorEmbed(`❌`, `Insufficient funds!`, msg)
      }

      authorScore.money -= amount
      userScore.money += amount

      this.client.setScore.run(authorScore)
      this.client.setScore.run(userScore)

      embed = genSuccessEmbed(`Success!`, `Gave user **${user.username} ${amount}** Spec$!`, msg)
    } catch (e) {
      embed = genErrorEmbed(`An error has occurred`, e.message, msg)
    }
    return msg.say(embed)
      .then(user.send(`**${msg.author.username}** gave you **${amount}** Spec$! (Total: **${userScore.money}**)`))
  }
}
