const color = require(`./randomhex`)
const logger = require(`./logger`)
const { genErrorEmbed, genSimpleEmbed, genSuccessEmbed } = require(`./embeds`)

const sendError = (error, msg) => {
  logger.error(error.message)
  return msg.say(genErrorEmbed(`An error has occured.`, error.message, msg))
}

const notSet = (msg, joinOrLeave) => {
  return msg.say(genErrorEmbed(`❌ The ${joinOrLeave} message isn't set!`, `Try setting it up with \`${joinOrLeave}message set Your message here (%s will get substituted for the tag)\``, msg))
}

module.exports = (msg, jMsg, action, joinOrLeave) => {
  switch (action) {
  case `set`:
    if (!jMsg.includes(`%s`)) {
      return msg.say(genErrorEmbed(`❌ The ${joinOrLeave} message doesn't contain "%s" (which will get replaced for the tag)`, `Aborting...`, msg))
    } else {
      try {
        msg.client.provider.set(msg.guild, joinOrLeave, jMsg)
        logger.info(`Guild's (${msg.guild.name}) '${joinOrLeave}' message has been set to '${jMsg}'.`)
        return msg.say(genSuccessEmbed(`✅ The ${joinOrLeave} message has been set to`, jMsg.replace(/(%s)/gi, `\`tag\``), msg))
      } catch (e) {
        return sendError(e, msg)
      }
    }
  case `disable`:
    const joinOrLeaveMsg = msg.client.provider.get(msg.guild, joinOrLeave, null)

    if (!joinOrLeaveMsg) {
      return notSet(msg, joinOrLeave)
    } else {
      try {
        msg.client.provider.remove(msg.guild, joinOrLeave)
        return msg.say(genSuccessEmbed(`✅`, `The ${joinOrLeave} message has been disabled.`, msg))
      } catch (e) {
        return sendError(e, msg)
      }
    }
  default: {
    const joinOrLeaveMsg = msg.client.provider.get(msg.guild, joinOrLeave, null)

    if (joinOrLeaveMsg) {
      return msg.say(genSimpleEmbed([[`The current ${joinOrLeave} message is`, joinOrLeaveMsg.replace(/(%s)/gi, `\`tag\``)]], color(), msg))
    } else {
      return notSet(msg, joinOrLeave)
    }
  }
  }
}
