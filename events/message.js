module.exports = (client, message) => {

  // if the message was sent by a bot, ignore it
  if (message.author.bot) return;

  // define the prefix (if a database is used, get the prefix here)
  const prefix = '!';

  // if the message don't start with the prefix, ignore it
  if (!message.content.startsWith(prefix)) return;

  // define the command name and arguments
  // regex explained here: https://stackoverflow.com/a/16261693
  const args = message.content.slice(prefix.length).match(/[^" ]+|("[^"]*")/g);
  const commandName = args.shift();

  // if any argument starts with a quote character, remove all instances of those from the argument
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('"')) args[i] = args[i].replace(/"/g, '');
  };

  // get the command to run
  const command = client.commands.get(commandName);

  // if the command was found, execute it
  if (command) command.exec(client, message, command, args);

};
