const request = require('request');
const Discord = require('discord.js');

module.exports.run = (client, message, args, config) => {
  message.channel.send('Fetching random dog...');
  try {
    request({
      uri: 'http://random.dog/woof',
    }, (error, response, body) => {
      const url = 'http://random.dog/' + body;
      const extension = url.substring(url.indexOf('.'));

      message.channel.send(new Discord.MessageAttachment(url, 'dog' + extension));
    });
  } catch(e) {
    message.channel.send('The `random.dog` API failed to respond correctly.');
  }
};

module.exports.info = {
  'version': '1.0',
  'name': 'randomdog',
  'help': 'Get a random dog!',
  'usage': '',
  'hidden': false,
};
