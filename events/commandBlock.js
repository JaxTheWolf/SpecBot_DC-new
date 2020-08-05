module.exports = (client, message, reason) => {
  const logger = require(`../utils/logger`)

  logger.info(`Command '${message.command.name}' has been blocked from being executed by '${message.author.tag}'. (Reason: '${reason}')`)
}
