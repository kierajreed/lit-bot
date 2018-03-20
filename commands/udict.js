module.exports.run = (client, message, args, config) => {
  if(args.length < 1 || args.length > 2) return message.channel.send(config.messages.udict.noArgError);
};

module.exports.info = {
  "version": "1.0",
  "name": "udict",
  "help": "Look up a word on the Urban Dictionary!",
  "usage": "",
  "hidden": false
};
