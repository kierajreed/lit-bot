module.exports.checkMessage = (message) => {
  if(/[^01 ]/gm.test(message.content) || message.content === '') return;

  const words = message.content.trim().split(/ +/g);
  let result = 'Translation:```';

  words.forEach((value, index, array) => {
    if(value.length !== 8) {
      return;
    }
    
    result += String.fromCharCode(parseInt(value, 2));
  });

  result += '```';

  message.channel.send(result);
};
