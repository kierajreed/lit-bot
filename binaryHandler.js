module.exports.checkMessage = (message) => {
  if(/[^01 ]/gm.test(message.content)) return;

  const words = message.content.trim().split(/ +/g);
  console.log(words);
  let result = 'Translation:```';

  words.forEach((value, index, array) => {
    if(value.length != 8) {
      return;
    } else {
      result += String.fromCharCode(parseInt(value, 2));
    }
  });

  result += '```';

  message.channel.send(result);
};
