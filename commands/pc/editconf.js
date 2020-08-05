const { Command } = require(`discord.js-commando`)
const { editConf } = require(`../../utils/pcDB`)

module.exports = class EditConfCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`edit`],
      args: [
        {
          default: ``,
          error: `Please enter the configuration number you'd like to edit (1 or 2)`,
          key: `confNum`,
          oneOf: [`1`, `2`],
          prompt: `Which configuration would you like to edit? (1 or 2)`,
          type: `string`
        },
        {
          default: ``,
          key: `component`,
          prompt: `Which component would you like to edit?`,
          type: `string`
        },
        {
          default: ``,
          key: `newCmp`,
          prompt: `What should the new entry be?`,
          type: `string`
        }
      ],
      description: `Edits your configuration`,
      examples: [`editpc 1 GPU "Radeon R4" (Wrap arguments with spaces in quotes)`],
      group: `pc`,
      memberName: `editconf`,
      name: `editconf`
    })
  }
  run (msg, { confNum, component, newCmp }) {
    return editConf(component, newCmp, confNum, msg)
  }
}
