module.exports.run = (client, message, args, config) => {
  message.channel.send("Pong!");
};

module.exports.info = {
  "version": "1.0",
  "name": "ping",
  "help": "Play ping-pong!",
  "usage": "",
  "hidden": false
};
