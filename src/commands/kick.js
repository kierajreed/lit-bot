const Discord = require('discord.js');

module.exports.run = (client, message, args, config) => {
  if(!message.guild) {
    return message.channel.send(config.messages.global.notGuildError);
  }

  if(message.member.permissions.has('KICK_MEMBERS')) {
    if(message.mentions.members.size === 0) {
      message.channel.send(config.messages.global.noMentionError.replace('#ACTION#', 'kick'));
    } else {
      // eslint-disable-next-line no-lonely-if
      if(message.mentions.members.first().kickable) {
        // get the reason
        let reason = '';

        for(let i = 1; i < args.length; i++) {
          reason += args[i] + ' ';
        }
        if(args.length === 1) {
          reason = 'Reason Not Provided';
        }
        const reasonEmbed = new Discord.MessageEmbed()
          .addField(':warning: User Kick :warning:', `**${message.mentions.members.first()}** *was kicked by*  **${message.author}**`)
          .addField('REASON', reason)
          .setColor(13631488);

        // DM kicked user
        const userToDM = message.mentions.members.first();
        const kickMessage = `You were kicked from **${message.guild.name}** for **${reason}**. Try not to do it again!`;

        if(userToDM.verified) userToDM.send(kickMessage);


        // kick + send reason
        message.mentions.members.first().kick();
        message.channel.send({embed: reasonEmbed});
      } else {
        message.channel.send(config.messages.kick.cannotKickError);
      }
    }
  } else {
    message.reply(config.messages.global.commandPermissionError);
  }
};

module.exports.info = {
  'version': '1.1',
  'name': 'kick',
  'help': 'Kick a member out of your server!',
  'usage': '',
  'hidden': false,
};
