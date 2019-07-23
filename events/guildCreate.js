// Require node modules.
const path = require('path')

// Get the guild settings model.
const GuildSettings = require(path.join(__rootdir, 'models/GuildSettings'))

module.exports = {
  name: 'guildCreate',
  exec: async (client, guild) => {

    // Check the database if the new guild have an entry, if not, create one.
    const guildSettings = await GuildSettings.findOne({guild_id: guild.id})
    if (!guildSettings) new GuildSettings({guild_id: guild.id}).save()
  }
}
