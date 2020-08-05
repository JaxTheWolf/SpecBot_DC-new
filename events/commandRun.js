module.exports = (client, command, promise, message) => {
  if (command.name === `unknown-command`) return

  const logger = require(`../utils/logger`)
  const argsList = message.argString.split(` `)
  argsList.shift()
  const msg = argsList.length <= 0
    ? `Command '${command.name}' was used by '${message.author.tag}'.`
    : `Command '${command.name}' with args '${argsList.join(` `)}' was used by '${message.author.tag}'.`

  logger.info(msg)
}
