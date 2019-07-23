// Require node modules.
const Discord = require('discord.js')
const path = require('path')

// Get the guild settings model.
const GuildSettings = require(path.join(__rootdir, 'models/GuildSettings'))

module.exports = {
  name: 'prefix',
  description: 'Used to change the prefix for the server.',
  example: '{p}prefix [new_prefix]',
  permission: ['MANAGE_GUILD'],
  async exec(client, message, command, args) {

    // Get the guilds settings entry.
    const guildSettings = await GuildSettings.findOne({guild_id: message.guild.id})

    // If the number of arguments specified is wrong, notify the member.
    if (args.length !== 1) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor('#ff9800')
        .setDescription('Invalid amount of arguments, this command takes a single argument.')
      )
    }

    // Define the new prefix.
    const newPrefix = args[0]

    // If the new prefix is the same as the old one, notify the member and abort.
    if (guildSettings.prefix === newPrefix) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor('#2196f3')
        .setDescription('The new prefix is the same as the old one, no changes were made.')
      )
    }

    // If all checks are passed, update the prefix and notify.
    guildSettings.prefix = newPrefix
    guildSettings.save().then(success => {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor('#4caf50')
        .setDescription(`The prefix for the server was updated to: **${newPrefix}**`)
      )
    }).catch(err => {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor('#f44336')
        .setDescription('There was an error updating the prefix, please try again.')
      )
    })
  }
}
