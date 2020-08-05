module.exports = (client, member) => {
  const { delConf } = require(`../utils/pcDB`)
  const joinChannID = client.provider.get(member.guild, `joinchann`, null)
  const leaveMsg = client.provider.get(member.guild, `leave`, `We're sorry to see you leaving, %s \\:(`)
  if (joinChannID) {
    return client.channels.resolve(joinChannID).send(leaveMsg.replace(/(%s)/gi, `${member.user.tag}`))
  }
  // client.removeRow.run(member.user.id)
  // delconf()
}
