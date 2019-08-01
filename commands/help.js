// get dependecies
const path = require('path');
const Discord = require('discord.js');
const recursive = require('recursive-readdir');

module.exports = {
  name: 'help',
  description: 'Command description.',
  example: '`Command example`',
  async exec(client, message) {

    // define the prefix
    const prefix = "!"

    // get all command files
    const commandPaths = await recursive(path.join(__rootdir, 'commands'));

    // construct the message to send
    const helpMessage = new Discord.MessageEmbed()
      .setColor("#2196f3")

    for (commandPath of commandPaths) {
      const command = require(commandPath)
      helpMessage.addField(`${prefix}${command.name}, ${command.description}`, `\n${command.example}`)
    }

    message.channel.send(helpMessage)
  }
};
