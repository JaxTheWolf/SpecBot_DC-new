/* eslint-disable require-sort/require-sort */
const SQLite3 = require(`better-sqlite3`)
const { readdir } = require(`fs`)
const settingsDB = new SQLite3(`${__dirname}/DBs/settings.sqlite3`)
const logger = require(`./utils/logger`)
const {
  disableEveryone,
  owner,
  prefix,
  token,
  unknownCommandResponse
} = require(`./configs/conf.json`)
const { CommandoClient, SyncSQLiteProvider } = require(`discord.js-commando`)
const { join } = require(`path`)
/* eslint-enable require-sort/require-sort */

const client = new CommandoClient({
  commandPrefix: prefix,
  disableEveryone: disableEveryone,
  owner: owner,
  unknownCommandResponse: unknownCommandResponse
})

client.registry
  .registerDefaultTypes()
  .registerGroups([
    [`main`, `"Main" commands.`],
    [`settings`, `Guild specific settings`],
    [`info`, `Informative commands.`],
    [`mods`, `Moderation related commands.`],
    [`fun`, `Various fun commands.`],
    [`owner`, `Owner-only commands.`],
    [`pc`, `General stuff about computers.`],
    [`economy`, `Economy related commands.`],
    [`animals`, `All sorts of animal related commands.`]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(join(__dirname, `commands`))

readdir(`./events/`, (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith(`.js`)) return
    const event = require(`./events/${file}`)
    const eventName = file.split(`.`)[0]
    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
  })
})

client.setProvider(new SyncSQLiteProvider(settingsDB))

const cleanupFunc = async (code) => {
  await logger.info(`Exitting!`)
  await client.destroy()
  process.exit(code)
}

process.once(`SIGINT`, cleanupFunc)
process.once(`SIGTERM`, cleanupFunc)
process.once(`exit`, cleanupFunc)

client.login(token)
