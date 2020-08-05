const { Command } = require(`discord.js-commando`)
const { setConf } = require(`../../utils/pcDB`)

module.exports = class Setpc1Command extends Command {
  constructor (client) {
    super(client, {
      args: [
        {
          error: `Please enter a valid configuration (1 or 2)`,
          key: `conf`,
          oneOf: [`1`, `2`],
          prompt: `Which configuration would you like to set? (1 or 2)`,
          type: `string`
        },
        {
          key: `cpu`,
          prompt: `What CPU do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `gpu`,
          prompt: `What GPU do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `ram`,
          prompt: `What RAM do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `case_`,
          prompt: `Which CASE do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `mobo`,
          prompt: `What MOBO do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `psu`,
          prompt: `What PSU do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `cooler`,
          prompt: `What COOLER do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `storage`,
          prompt: `What STORAGE do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `screen`,
          prompt: `What SCREEN do you have?`,
          type: `string`,
          wait: 90
        },
        {
          key: `keyboard`,
          prompt: `What KEYBOARD do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `mouse`,
          prompt: `What MOUSE do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `headset`,
          prompt: `What HEADSET do you use?`,
          type: `string`,
          wait: 90
        },
        {
          key: `extra`,
          prompt: `Do you have any extra accessories?`,
          type: `string`,
          wait: 90
        }
      ],
      description: `Sets a configuration (1, 2 or server)`,
      examples: [`setconf 1 ...`],
      group: `pc`,
      memberName: `setconf`,
      name: `setconf`
    })
  }
  run (msg, { conf, case_, cooler, cpu, extra, gpu, headset,
    keyboard, mobo, mouse, psu, ram, screen, storage }) {
    const content = {
      'CASE': case_,
      'COOLER': cooler,
      'CPU': cpu,
      'EXTRA': extra,
      'GPU': gpu,
      'HEADSET': headset,
      'KEYBOARD': keyboard,
      'MOBO': mobo,
      'MOUSE': mouse,
      'PSU': psu,
      'RAM': ram,
      'SCREEN': screen,
      'STORAGE': storage
    }

    return setConf(content, conf, msg)
  }
}
