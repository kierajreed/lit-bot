const clearRequire = require('clear-require');

module.exports.run = (client, message, args, config) => {
  if(message.author.id === config.owner) {
    clearRequire.all();
    console.log('ALL COMMANDS RELOADED');
    message.channel.send(config.messages.reloadall.onReloadAll);
  } else {
    message.reply(config.messages.global.commandPermissionError);
  }
};

module.exports.info = {
  "version": "1.1",
  "name": "reloadall",
  "help": "Reload all commands. Owner only.",
  "usage": "",
  "hidden": true
};
