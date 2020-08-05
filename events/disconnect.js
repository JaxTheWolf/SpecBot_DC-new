module.exports = event => {
  const logger = require(`../utils/logger`)

  logger.warn(`Client's WebSocket disconnected! Code: '${event.code}'`)
}
