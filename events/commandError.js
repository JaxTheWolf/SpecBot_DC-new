const logger = require(`../utils/logger`)

module.exports = (client, command, error) => {
  if (command.name === `unknown-command`) return
  logger.error(`Command '${command.name}' has been ran with an error: '${error}'!`)
}
