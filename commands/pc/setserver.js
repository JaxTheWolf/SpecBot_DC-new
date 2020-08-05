const { Command } = require(`discord.js-commando`)
const { setConf } = require(`../../utils/pcDB`)

module.exports = class SetServerCommand extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          infinite: true,
          key: `serverconf`,
          prompt: `Type out your server specs here:`,
          type: `string`
        }
      ],
      description: `Sets a server`,
      examples: [`setserver`],
      group: `pc`,
      memberName: `setserver`,
      name: `setserver`
    })
  }
  run (msg, { serverconf }) {
    const content = `Server: \n${serverconf.join(`\n`)}`

    return setConf(msg, content, `server`, __dirname)
  }
}
