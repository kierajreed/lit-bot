const {Command} = require('quick-bot');

module.exports = new Command('pong', (client, message, config) => {
  message.channel.send('Ping!');
});
