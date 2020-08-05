module.exports = (client, guild) => {
  const logger = require(`../utils/logger`)

  logger.info(`Joined guild '${guild.name}'.`)
}
