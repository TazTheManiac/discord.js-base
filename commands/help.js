// Require node modules.
const Discord = require('discord.js')
const path = require('path')

// Get the guild settings model.
const GuildSettings = require(path.join(__rootdir, 'models/GuildSettings'))

module.exports = {
  name: 'help',
  description: 'Used to get help with a specific command.',
  example: '{p}help',
  async exec(client, message, command, args) {

    // Get the guilds settings entry,
    const guildSettings = await GuildSettings.findOne({guild_id: message.guild.id})

    // Construct the message to send.
    const helpMessage = new Discord.MessageEmbed()
      .setColor('#2196f3')

    // Add a field for every command.
    const commands = client.commands.array()
    for (const command of commands) {
      helpMessage.addField(command.example.replace('{p}', guildSettings.prefix), command.description)
    }

    // Send the message in the same channel the command was sent from.
    message.channel.send(helpMessage)
  }
}
