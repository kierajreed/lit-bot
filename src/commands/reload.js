module.exports.run = (client, message, args, config) => {
  if(message.author.id !== config.owner) {
    return message.reply(config.messages.global.commandPermissionError);
  }
  if(!args || args.size < 1) {
    return message.reply(config.messages.reload.commandFileNotFoundError);
  }

  delete require.cache[require.resolve(`./${args[0]}.js`)];
  console.log(`Reloaded command '${args[0]}!'`);
  message.reply(`the command \`${args[0]}\` has been reloaded!`);
};

module.exports.info = {
  "version": "1.0",
  "name": "reload",
  "help": "Reload a command. Owner only.",
  "usage": "",
  "hidden": true
};
