module.exports = (client, group) => {
  const logger = require(`../utils/logger`)

  logger.info(`Registered command group '${group.name}'.`)
}
