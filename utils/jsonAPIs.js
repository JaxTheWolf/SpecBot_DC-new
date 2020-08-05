const { get } = require(`https`)

exports.sendImg = (msg, reqUrl, field) => {
  const color = require(`./randomhex`)
  const { genEmbeddedImage, genErrorEmbed } = require(`./embeds`)

  get(reqUrl, (response) => {
    let data = ``
    response.on(`data`, chunk => {
      data += chunk
    })
    response.on(`end`, () => {
      const parsed = JSON.parse(data)
      return msg.say(genEmbeddedImage(reqUrl,
        parsed[field], color(), reqUrl.includes(`meme`) ? parsed.caption : ``,
        `Trouble viewing the image? Link [**here**](${JSON.parse(data)[field]})`, msg))
    })
  })
    .on(`error`, err => {
      return msg.say(genErrorEmbed(`An error has occurred`, err.message, msg))
    })
}

exports.fetchText = (msg, emote, reqUrl, field) => {
  get(reqUrl, (response) => {
    let data = ``
    response.on(`data`, chunk => {
      data += chunk
    })
    response.on(`end`, () => {
      const getDeepProp = (obj, path) => path.split(`.`).reduce((acc, part) => acc && acc[part], obj)

      return msg.say(`${emote} | ${getDeepProp(JSON.parse(data), field).replace(/\\/g, ``)}`)
    })
  })
}
