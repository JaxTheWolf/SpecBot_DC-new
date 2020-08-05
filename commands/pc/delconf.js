const { Command } = require(`discord.js-commando`)
const { delConf } = require(`../../utils/pcDB`)

module.exports = class DelConfCommand extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          error: `Please respond with the number of the configuration you'd like to delete (1 or 2)`,
          key: `confNum`,
          oneOf: [`1`, `2`, `server`],
          prompt: `Which configuration would you like to delete? (1, 2 or server)`,
          type: `string`
        },
        {
          error: `Reply with yes/no.`,
          key: `confirm`,
          oneOf: [`yes`, `no`],
          prompt: `Do you want to proceed? (yes or no)`,
          type: `string`
        }
      ],
      description: `Deletes your configuration (1, 2 or server)`,
      examples: [`delconf 1 yes`, `delconf server no`],
      group: `pc`,
      memberName: `delconf`,
      name: `delconf`
    })
  }
  run (msg, { confNum, confirm }) {
    return delConf(confirm === `yes`, confNum, msg)
  }
}
