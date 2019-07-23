// Require node modules.
const path = require('path')

// Get the guild settings model.
const GuildSettings = require(path.join(__rootdir, 'models/GuildSettings'))

module.exports = {
  name: 'message',
  exec: async (client, message) => {

    // Get the guilds settings.
    const guildSettings = await GuildSettings.findOne({guild_id: message.guild.id})

    // Check if the message starts with the guild prefix.
    if (!message.content.startsWith(guildSettings.prefix)) return

    // Create the arguments and get the command to be executed.
    // The regex will match any strings, separated by spaces, unless it is inside a double quote (").
    const args = message.content.slice(guildSettings.prefix.length).match(/[^" ]+|("[^"]*")/g)

    // Get the command to run, and at the same time, remove the command name from the arguments.
    const command = client.commands.get(args.shift())
    if (!command) return

    // Check if the command needs permission to be executed, and if so, if the member has the permission to run it (admins, and the guild owner always have permission to run commands).
    if (command.permission === undefined || message.member.hasPermission(command.permission), {checkAdmin: true, checkOwner: true}) {
      command.exec(client, message, command, args)
    }
  }
}
