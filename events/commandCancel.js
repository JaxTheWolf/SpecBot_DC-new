module.exports = (client, command, reason, message) => {
  const logger = require(`../utils/logger`)

  logger.info(`Cancelled command '${command.name}', ran by '${message.author.tag}'. (Reason: '${reason}')`)
}
