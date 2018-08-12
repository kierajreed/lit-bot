const {Command} = require('quick-bot');

module.exports = new Command('ping', (client, message, config) => {
  message.channel.send('Pong!');
});
