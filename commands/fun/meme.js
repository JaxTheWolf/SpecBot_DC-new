const { Command } = require(`discord.js-commando`)
const { sendImg } = require(`../../utils/jsonAPIs`)

module.exports = class MemeCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Sends a random meme`,
      examples: [`meme`],
      group: `fun`,
      memberName: `meme`,
      name: `meme`
    })
  }
  run (msg) {
    return sendImg(msg, `https://some-random-api.ml/meme`, `image`)
  }
}
