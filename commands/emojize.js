function intCharToText(intChar) {
  return ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][intChar];
}

function charToEmoji(char) {
  const conversions = {
    "!": ":exclamation:",
    "?": ":question:",
    "+": ":heavy_plus_sign:",
    "-": ":heavy_minus_sign:",
    "$": ":heavy_dollar_sign:"
  };

  return conversions[char];
}

function emojize(text, config) {
  let letters = text.split('');

  let output = '';
    for(let i = 0; i < letters.length; i++) {
      letters[i] = letters[i].toLowerCase();
		  if(letters[i] === ' ') {
        output += config.commandSettings.emojize.space;
      } else if(/^[A-Z]/i.test(letters[i])) {
      	output += ':regional_indicator_' + letters[i] + ':';
      } else if(!isNaN(letters[i])) {
      	let num = parseInt(letters[i]);
        let numtext = intCharToText(num);
        output += ':' + numtext + ':';
      } else if(/[!\?+\-$]/i.test(letters[i])) {
        output += charToEmoji(letters[i]);
      } else {
      	output = `ERROR - Invalid Character: \`${letters[i]}\``;
        break;
      }
      output += ' ';
    }
  return output;
}

module.exports.run = (client, message, args, config) => {
  let textToEmojize = args.join(' ');
  if(textToEmojize.length < config.commandSettings.emojize.min || textToEmojize.length > config.commandSettings.emojize.max) {
    message.channel.send(config.messages.emojize.messageLengthError.replace('#MIN#', config.commandSettings.emojize.min).replace('#MAX#', config.commandSettings.emojize.max));
  } else {
    let emojizedText = emojize(textToEmojize, config);
    message.channel.send(emojizedText);
  }
};

module.exports.info = {
  "version": "1.2",
  "name": "emojize",
  "help": "Turn a message into emoji!",
  "usage": "",
  "hidden": false
};
