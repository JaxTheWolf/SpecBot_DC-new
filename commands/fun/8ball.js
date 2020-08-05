const { Command } = require(`discord.js-commando`)
const { fetchText } = require(`../../utils/jsonAPIs`)

module.exports = class EightBallCommand extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          default: ``,
          key: `question`,
          prompt: `What would you like to ask?`,
          type: `string`
        }
      ],
      description: `Ask a question and 8ball will answer`,
      examples: [`8ball Am I dumb?`],
      group: `fun`,
      memberName: `8ball`,
      name: `8ball`
    })
  }
  run (msg, { question }) {
    return fetchText(msg, `🎱`, `https://8ball.delegator.com/magic/JSON/${encodeURI(question)}`, `magic.answer`)
  }
}
