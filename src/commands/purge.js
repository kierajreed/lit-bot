module.exports.run = (client, message, args, config) => {
  if(!message.guild) {
    message.channel.send(config.messages.global.notGuildError);
    return;
  }

  if(message.member.permissions.has('MANAGE_MESSAGES')) {
    if(args.length > 0) {
      if(args[0] < 2 || args[0] > 100) {
        message.channel.send(config.messages.purge.messageAmountError);
        return;
      }
      message.channel.bulkDelete(parseInt(args[0], 10));
      message.channel.send(`Deleted ${args[0]} messages!`);
    } else {
      if(config.commandSettings.purge.default < 2 || config.commandSettings.purge.default > 100) {
        message.channel.send(config.messages.purge.messageAmountError);
        return;
      }
      message.channel.bulkDelete(config.purge.default);
      message.channel.send(`Deleted ${config.purge.default} messages!`);
    }
  } else {
    message.reply(config.messages.global.commandPermissionError);
  }
};

module.exports.info = {
  'version': '1.0',
  'name': 'purge',
  'help': 'Purge messages!',
  'usage': '',
  'hidden': false,
};
