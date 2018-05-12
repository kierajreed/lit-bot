module.exports.run = (client, message, args, config) => {
  message.channel.send('Ping!');
};

module.exports.info = {
  'version': '1.0',
  'name': 'pong',
  'help': 'Play ping-pong!',
  'usage': '',
  'hidden': false,
};
