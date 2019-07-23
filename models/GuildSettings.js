const mongoose = require('mongoose')

const guildSettings = new mongoose.Schema({
  guild_id: {type: String, required: true, unique: true},
  prefix: {type: String, default: '!'}
})

module.exports = mongoose.model('GuildSettings', guildSettings)
