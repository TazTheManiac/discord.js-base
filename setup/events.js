// Require node modules.
const Discord = require('discord.js')
const path = require('path')
const recursive = require('recursive-readdir')

module.exports = async (client) => {

  // Define a new discord Collection (same as new Map(), but with added functionality)
  client.events = new Discord.Collection()

  // For every file in the /events directory, map it by name, to the new collection.
  recursive(path.join(__rootdir, 'events')).then(eventFiles => {
    for (const eventFile of eventFiles) {
      const event = require(eventFile)
      client.events.set(event.name, event)
    }
  })
}
