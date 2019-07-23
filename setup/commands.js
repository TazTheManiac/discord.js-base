// Require node modules.
const Discord = require('discord.js')
const path = require('path')
const recursive = require('recursive-readdir')

module.exports = async (client) => {

  // Define a new discord Collection (same as new Map(), but with added functionality)
  client.commands = new Discord.Collection()

  // For every file in the /commands directory, map it by name, to the new collection.
  recursive(path.join(__rootdir, 'commands')).then(commandFiles => {
    for (const commandFile of commandFiles) {
      const command = require(commandFile)
      client.commands.set(command.name, command)
    }
  })

}
