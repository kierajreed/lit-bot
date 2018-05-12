module.exports.run = (client, message, args, config) => {
  message.channel.send(`My ping is \`${Math.round(client.ping)}ms\`!`);
};

module.exports.info = {
  "version": "1.0",
  "name": "cping",
  "help": "Display client ping!",
  "usage": "",
  "hidden": false
};
