module.exports = (client, message) => {

  // if the message was sent by a bot, ignore it
  if (message.author.bot) return

  

  // get the command to run
  client.commands.get('help').exec(client, message)
};
