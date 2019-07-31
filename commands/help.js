module.exports = {
  name: 'help',
  description: 'Command description.',
  example: '`Command example`',
  permission: ['ADMINISTRATOR'],
  dm: true,
  async exec(client, message) {
    console.log(message);
  }
};
