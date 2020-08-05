const welcome = require(`../../utils/welcome`)
const { Command } = require(`discord.js-commando`)

module.exports = class LeaveMsg extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          error: `Invalid action. Reply with either set, show or disable.`,
          key: `action`,
          oneOf: [`set`, `show`, `disable`],
          prompt: `What action would you like to perform? (set, show, disable)`,
          type: `string`
        },
        {
          default: ``,
          key: `jMsg`,
          prompt: `What should the leave message be?`,
          type: `string`
        }
      ],
      description: `Set the leave message`,
      examples: [`leavemsg set Hello, %s!`, `leavemsg delete`, `leavemsg`],
      group: `settings`,
      memberName: `leavemsg`,
      name: `leavemessage`
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(`ADMINISTRATOR`)
  }

  run (msg, { action, jMsg }) {
    welcome(msg, jMsg, action, `leave`)
  }
}
