const welcome = require(`../../utils/welcome`)
const { Command } = require(`discord.js-commando`)

module.exports = class JoinMsg extends Command {
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
          prompt: `What should the join message be?`,
          type: `string`
        }
      ],
      description: `Set the join message`,
      examples: [`joinmsg set Hello, %s!`, `joinmsg delete`, `joinmsg`],
      group: `settings`,
      memberName: `joinmsg`,
      name: `joinmessage`
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(`ADMINISTRATOR`)
  }

  run (msg, { action, jMsg }) {
    welcome(msg, jMsg, action, `join`)
  }
}
