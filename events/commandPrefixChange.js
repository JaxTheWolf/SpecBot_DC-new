module.exports = (client, guild, prefix) => {
  const logger = require(`../utils/logger`)

  logger.info(`The prefix in '${guild.name}' has been changed to '${prefix || `default`}'.`)
}
