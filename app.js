// Define some global variables (these shuld NEVER be modified after being decleared).
global.__rootdir = __dirname

// Set enviromental flags.
require('dotenv').config()

// Require node modules.
const Discord = require('discord.js')
const path = require('path')
const recursive = require('recursive-readdir')

// Create the discord client.
const client = new Discord.Client()

// Run the setup function.
require(path.join(__rootdir, 'functions/setupFunction')).setupFunction(client)

// List all the events the client should listen to.
client.on(`ready`, () => client.events.get('ready').exec(client))
client.on('message', (message) => client.events.get('message').exec(client, message))
client.on('guildCreate', (guild) => client.events.get('guildCreate').exec(client, guild))
client.on('error', (err) => client.events.get('error').exec(client, error))

// Log the client in with the specified token.
client.login(process.env.TOKEN)
