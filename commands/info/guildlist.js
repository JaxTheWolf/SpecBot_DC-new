const color = require(`../../utils/randomhex`)
const { Command } = require(`discord.js-commando`)
const { genSimpleEmbed } = require(`../../utils/embeds`)

module.exports = class GuildListCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`guilds`, `glist`, `servers`, `slist`],
      description: `Lists all the guilds the bot is in`,
      examples: [`guildlist`],
      group: `info`,
      memberName: `guildlist`,
      name: `guildlist`
    })
  }

  run (msg) {
    const guildlist = this.client.guilds.cache.map(g => `**${g.name}**\nMember count: **${g.memberCount}**`).join(`\n`)

    return msg.say(genSimpleEmbed([[`Here's the list of guilds the bot is in:`, guildlist]], color(), msg))
  }
}
