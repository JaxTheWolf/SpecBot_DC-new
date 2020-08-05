const color = require(`../../utils/randomhex`)
const { Command } = require(`discord.js-commando`)
const { genErrorEmbed, genSimpleEmbed, genSuccessEmbed } = require(`../../utils/embeds`)

module.exports = class WelcomeChannel extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          error: `Invalid action. Reply with either set, show, or disable`,
          key: `action`,
          oneOf: [`disable`, `set`, `show`],
          prompt: `What action would you like to perform? (set, show, disable)`,
          type: `string`
        },
        {
          default: ``,
          error: `Please enter a valid channel (#channel) or channel ID`,
          key: `channel`,
          prompt: `What should the welcome channel be?`,
          type: `channel`
        }
      ],
      description: `Use this to set the channel where the invite messages will be sent or to disable them.`,
      examples: [`welcome show`, `welcome disable`, `welcome set #welcome`, `welcome set 570179101340262656`],
      group: `settings`,
      guildOnly: true,
      memberName: `welcomechannel`,
      name: `welcome`
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission(`ADMINISTRATOR`)
  }

  run (msg, { action, channel }) {
    const isText = (channel) => {
      return channel.type === `text`
    }

    const joinchann = this.client.provider.get(msg.guild, `joinchann`, null)

    switch (action) {
    case `set`:
      if (isText(channel) && joinchann === null) {
        this.client.provider.set(msg.guild, `joinchann`, channel.id)
        return msg.say(genSuccessEmbed(`✅`, `The welcome channel has been set to <#${channel.id}>.`, msg))
          .catch(e => {
            msg.say(genErrorEmbed(`An error has occurred.`, e.message, msg))
          })
      } else if (joinchann !== null) {
        return msg.say(genErrorEmbed(`❌`, `You already have the join channel set!`, msg))
      } else {
        return msg.say(genErrorEmbed(`❌`, `Invalid channel!`, msg))
      }
    case `disable`:
      if (joinchann === null) {
        return msg.say(genErrorEmbed(`❌`, `The welcome function is already disabled!`, msg))
      } else {
        this.client.provider.remove(msg.guild, `joinchann`)

        return msg.say(genSuccessEmbed(`✅`, `The join channel has been sucessfully disabled!`, msg))
      }
    default:
      if (joinchann !== null) {
        return msg.say(genSimpleEmbed([[`The current welcome channel is`, `<#${joinchann}>!`]], color(), msg))
      } else {
        return msg.say(genErrorEmbed(`❌`, `The welcome channel isn't set!`, msg))
      }
    }
  }
}
