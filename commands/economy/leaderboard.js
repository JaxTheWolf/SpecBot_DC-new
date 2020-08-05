const color = require(`../../utils/randomhex`)
const SQLite = require(`better-sqlite3`)
const { Command } = require(`discord.js-commando`)
const { genErrorEmbed } = require(`../../utils/embeds`)
const { MessageEmbed } = require(`discord.js`)

module.exports = class LeaderboardCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`lb`, `leaders`, `top10`, `top`],
      description: `Shows the top 10 users (points-wise)`,
      examples: [`leaderboard`],
      group: `economy`,
      guildOnly: true,
      memberName: `leaderboard`,
      name: `leaderboard`
    })
  }
  run (msg) {
    let embed
    try {
      const sql = new SQLite(`${__dirname}/../../DBs/scores.sqlite3`)
      const top10 = sql
        .prepare(`SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;`)
        .all(msg.guild.id)
      embed = new MessageEmbed()
        .setAuthor(this.client.user.username, this.client.user.avatarURL)
        .setColor(color())
        .setDescription(`Our top 10 points leaders!`)
        .setTitle(`Leaderboard`)

      for (const data of top10) {
        try {
          embed.addField(this.client.users.cache.get(data.user).tag, `**${data.points}** points (level: **${data.level}**, Spec$: **${data.money}**)`)
        } catch (e) {
          this.client.removeRow.run(data.user.id)
        }
      }
    } catch (e) {
      embed = genErrorEmbed(`An error has occurred`, e.message, msg)
    }
    return msg.say(embed)
  }
}
