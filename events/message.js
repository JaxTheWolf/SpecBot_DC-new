module.exports = (client, msg) => {
  if (msg.author.bot || !msg.guild) return

  const score = client.getScore.get(msg.author.id, msg.guild.id) || {
    guild: msg.guild.id,
    id: `${msg.guild.id}-${msg.author.id}`,
    level: 1,
    money: 5,
    points: 0,
    user: msg.author.id
  }

  score.points++

  const curLevel = Math.floor((3 / 8) * Math.sqrt(score.points))

  if (score.level < curLevel) {
    score.level++
    score.money += 5
    msg.channel.send(`${msg.author.username}, you've leveled up to level **${score.level}**!\nYou've also gained **${score.money}** Spec$!`).then(m => m.delete({ timeout: 3000 }))
  }
  client.setScore.run(score)
}
