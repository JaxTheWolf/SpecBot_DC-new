const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../utils/jsonAPIs`)

module.exports = class KoalaCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Sends a random image of a koala.`,
      examples: [`koala`],
      group: `animals`,
      memberName: `koala`,
      name: `koala`
    })
  }
  run (msg) {
    return sendImg(msg, `https://some-random-api.ml/img/koala`, `link`)
  }
}
