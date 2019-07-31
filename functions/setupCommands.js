const path = require('path');
const Discord = require('discord.js');
const recursive = require('recursive-readdir');

module.exports = async (client) => {
  client.commands = new Discord.Collection()
  const commandFiles = await recursive(path.join(__rootdir, 'commands'));
  for (commandFile of commandFiles) {
    const command = require(commandFile);
    const name = path.basename(commandFile, '.js');
    client.commands.set(name, command);
  };
};
