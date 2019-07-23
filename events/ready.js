// Require node modules.
const path = require('path')

// Get the guild settings model.
const GuildSettings = require(path.join(__rootdir, 'models/GuildSettings'))

module.exports = {
  name: 'ready',
  exec: async (client) => {

    // Check the database if every guild have a settings entry.
    // Create one for the guilds that don't.
    for (const guild of client.guilds.array()) {
      const guildSettings = await GuildSettings.findOne({guild_id: guild.id})
      if (!guildSettings) new GuildSettings({guild_id: guild.id}).save()
    }

    // Set the clients activity.
    client.user.setActivity(`new bot`, {type: 'PLAYING'})

    // Notify that the client is ready.
    console.log(`${client.user.username} is now ready`);
  }
}
