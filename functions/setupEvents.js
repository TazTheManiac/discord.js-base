const path = require('path');
const Discord = require('discord.js');
const recursive = require('recursive-readdir');

module.exports = async (client) => {
  client.events = new Discord.Collection();
  const eventFiles = await recursive(path.join(__rootdir, 'events'));
  for (eventFile of eventFiles) {
    const event = require(eventFile);
    const name = path.basename(eventFile, '.js');
    client.events.set(name, event);
  };
};
