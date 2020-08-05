const { prefix } = require(`../configs/conf.json`)
const { version } = require(`../package.json`)

exports.setActivity = client => {
  client.user.setActivity(`in ${client.guilds.cache.size} servers|${prefix}help|v.${version}`)
}

exports.setRandomActivity = client => {
  const playing = [
    `crying in my bed`,
    `yourself`,
    `a prank on you`,
    `literally nothing`,
    `games you can't afford`,
    `with fire`,
    `with Playing with Playing with`,
    `with your feelings`,
    `Half-Life 3 Early Access`,
    `with ${client.users.cache.size} users`,
    `with bots`,
    `nothing because of EU`,
    `alone :(`,
    `с товарищ`,
    `russian war crimes`,
    `hide and seek with FBI`,
    `far away from Putin`,
    `sudo rm -rf /* --no-preserve-root`,
    `in ${client.guilds.cache.size} servers|${prefix}help`,
    `version v${version}`,
    `myself`,
    `absolutely nothing`,
    `Watch Dogs 4`,
    `literally nothing`,
    ``
  ]

  client.user.setActivity(playing[Math.floor(Math.random() * playing.length)])
}
