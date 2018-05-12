const uDict = require('urban-dictionary');
const Discord = require('discord.js');

module.exports.run = (client, message, args, config) => {
  if(args.length < 1) return message.channel.send(config.messages.udict.argError);
  let word = '';

  for(let i = 0; i < args.length; i++) {
    word += args[i];
    if(i < args.length - 1) {
      word += ' ';
    }
  }
  word = word.substring(0, word.length);

  uDict.term(word, (error, entries, tags, sounds) => {
    if(error) {
      console.log('ERROR: ' + error.message);
      message.channel.send(error.message + ' Sorry.');
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor(914964)
        .setTitle(entries[0].word)
        .addField('Definition:', entries[0].definition)
        .addField('Example:', entries[0].example);

      message.channel.send(embed);
    }
});
};

module.exports.info = {
  'version': '1.0',
  'name': 'udict',
  'help': 'Look up a word on the Urban Dictionary!',
  'usage': '',
  'hidden': false,
};
