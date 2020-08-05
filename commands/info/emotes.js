const { Command } = require(`discord.js-commando`)
const { genErrorEmbed } = require(`../../utils/embeds`)

module.exports = class XYZCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Sends a message containing all server emotes`,
      examples: [`emotes`],
      group: `info`,
      guildOnly: true,
      memberName: `emotes`,
      name: `emotes`
    })
  }

  run (msg) {
    const fetchEmojis = (guild) => {
      const emojiList = guild.emojis.cache.map(e => e.toString()).join(` `)
      return emojiList ? msg.say(emojiList) : msg.say(genErrorEmbed(`❌`, `This server doesn't have any custom emotes!`, msg))
    }
    return fetchEmojis(msg.guild)
  }
}
