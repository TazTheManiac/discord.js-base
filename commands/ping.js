module.exports = {
  name: 'ping',
  description: 'Command description.',
  example: '`Command example`',
  async exec(client, message) {

    const pongMessage = await message.channel.send('ping...');
    pongMessage.edit(`Pong! ${pongMessage.createdTimestamp - message.createdTimestamp}ms.`);
  }
};
