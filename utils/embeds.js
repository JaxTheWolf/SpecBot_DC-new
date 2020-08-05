exports.genSimpleEmbed = (fields, color, msg) => {
  const { MessageEmbed } = require(`discord.js`)

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(msg.author.username, msg.author.displayAvatarURL({ size: 2048 }))

  for (const [title, desc] of fields) {
    embed.addField(title, desc)
  }
  return embed
}

exports.genSuccessEmbed = (title, text, msg) => {
  return exports.genSimpleEmbed([[title, text]], `0x7cfc00`, msg)
}

exports.genErrorEmbed = (title, text, msg) => {
  return exports.genSimpleEmbed([[title, text]], `0xff0000`, msg)
}

exports.genEmbeddedImage = (footUrl, url, color, title = ``, description = ``, msg) => {
  const embed = exports.genSimpleEmbed([], color, msg)

  if (title) {
    embed.setTitle(title)
  }
  if (description) {
    embed.setDescription(description)
  }

  embed.setFooter(footUrl || `Images are fetched from ${footUrl}.`)
    .setImage(url)

  return embed
}
