const Discord = require('discord.js');

module.exports.run = (client, message, args, config) => {
  if(!message.guild) {
    message.channel.send(config.messages.global.notGuildError);
    return;
  }

  if(message.member.permissions.has('BAN_MEMBERS')) {
    if(message.mentions.members.size === 0) {
      message.channel.send(config.messages.global.noMentionError.replace('#ACTION#', 'ban'));
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
          .addField(':warning: User Ban :warning:', `**${message.mentions.members.first()}** *was banned by*  **${message.author}**`)
          .addField('REASON', reason)
          .setColor(13631488);

        // DM kicked user
        const userToDM = message.mentions.members.first();
        const banMessage = `You were banned from **${message.guild.name}** for **${reason}**. Try not to do it again!`;

        if(userToDM.verified) userToDM.send(banMessage);


        // ban + send reason
        message.mentions.members.first().ban();
        message.channel.send({embed: reasonEmbed});
      } else {
        message.channel.send(config.messages.ban.cannotBanError);
      }
    }
  } else {
    message.reply(config.messages.global.commandPermissionError);
  }
};

module.exports.info = {
  'version': '1.1',
  'name': 'ban',
  'help': 'Ban a member from your server!',
  'usage': '',
  'hidden': false,
};
