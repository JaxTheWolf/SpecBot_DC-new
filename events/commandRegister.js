module.exports = (client, command) => {
  const logger = require(`../utils/logger`)

  logger.info(`Registered command '${command.name}.'`)
}
