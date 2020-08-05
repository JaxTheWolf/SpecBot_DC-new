const color = require(`./randomhex`)
const logger = require(`./logger`)
const SQLite = require(`better-sqlite3`)
const { genErrorEmbed, genSuccessEmbed } = require(`./embeds`)

const db = new SQLite(`${__dirname}/../DBs/configurations.sqlite3`)

let embed

exports.delConf = (confirm, conf, msg) => {
  conf === `server` ? conf = `server` : conf = `conf${conf}`

  if (!confirm) return msg.reply(`Cancelled command.`)

  try {
    db.prepare(`DELETE FROM ${conf} WHERE id = ?;`).run(msg.author.id)
    embed = genSuccessEmbed(`✅`, `Configuration successfully deleted!`, msg)
  } catch (e) {
    embed = genErrorEmbed(`❌`, `You don't have a configuration yet or an error has occurred.`, msg)
  }
  return msg.say(embed)
}

exports.editConf = (component, newComponent, conf, msg) => {
  const allowed = [`CASE`, `COOLER`, `CPU`, `EXTRA`, `GPU`, `HEADSET`,
    `KEYBOARD`, `MOBO`, `MOUSE`, `PSU`, `RAM`, `SCREEN`, `STORAGE`]

  if (!allowed.includes(component.toUpperCase())) {
    embed = genErrorEmbed(`❌`, `\`${component}\` is not a valid component!`, msg)
  } else {
    try {
      const row = db.prepare(`SELECT conf FROM conf${conf} WHERE ID = ?;`)
        .get(msg.author.id)
      const confOBJ = JSON.parse(row.conf)
      confOBJ[component.toUpperCase()] = newComponent
      embed = genSuccessEmbed(`✅`, `Configuration updated successfully!`, msg)
      db.prepare(`UPDATE conf${conf} SET conf = ? WHERE id = ?;`)
        .run([JSON.stringify(confOBJ), msg.author.id])
    } catch (e) {
      if (e.message === `Cannot read property 'conf' of undefined`) {
        embed = genErrorEmbed(`❌`, `You don't have a configuration yet!`, msg)
      } else {
        embed = genErrorEmbed(`An error has occurred while saving your configuration.`, e.message, msg)
      }
    }
  }
  return msg.say(embed)
}

exports.sendConf = (user, conf, msg) => {
  const { MessageEmbed } = require(`discord.js`)
  const _user = user || msg.author
  conf === `server` ? conf = `server` : conf = `conf${conf}`
  try {
    const row = (db.prepare(`SELECT conf FROM ${conf} WHERE id = ?;`).get(_user.id))
    const confOBJ = JSON.parse(row.conf)
    const entries = Object.entries(confOBJ)

    embed = new MessageEmbed()
      .setTitle(`Here's ${_user.username}'s configuration!`)
      .setColor(color())

    for (let i = 0; i < entries.length; i++) {
      embed.addField(entries[i][0], entries[i][1])
    }
  } catch (e) {
    if (typeof confOBJ === `undefined`) {
      embed = genErrorEmbed(`❌`, `This person doesn't have a configuration yet!`, msg)
    } else {
      embed = genErrorEmbed(`An error has occurred.`, e.message, msg)
    }
  }
  return msg.say(embed)
}

exports.setConf = (content, conf, msg) => {
  try {
    db.prepare(`INSERT INTO conf${conf}(id, conf) VALUES (?, ?);`)
      .run(msg.author.id, JSON.stringify(content))
    embed = genSuccessEmbed(`✅`, `Configuration saved successfully!`, msg)
  } catch (e) {
    if (e.message.includes(`UNIQUE constraint failed`)) {
      embed = genErrorEmbed(`❌`, `You already own a configuration!`, msg)
    } else {
      embed = genErrorEmbed(`An error has occurred while saving your configuration.`, e.message, msg)
    }
  }
  return msg.say(embed)
}
