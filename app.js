// set enviromental variables
require('dotenv').config();

// define the root directory of the application (this is a global variable and should not be reassigned)
global.__rootdir = __dirname;

// get dependecies
const path = require('path');
const Discord = require('discord.js');
const recursive = require('recursive-readdir');

// define the discord client
const client = new Discord.Client();

// define the functions that should run on start
const bootScripts = [
  require(path.join(__rootdir, 'functions/setupEvents')),
  require(path.join(__rootdir, 'functions/setupCommands')),
];

// then run the functions
for (bootScript of bootScripts) bootScript(client);

// list events to listen to (allways send the client)
client.on('ready', ()           => client.events.get('ready')(client));
client.on('message', (message)  => client.events.get('message')(client, message));

// log the client in to discord
client.login(process.env.D_TOKEN);
