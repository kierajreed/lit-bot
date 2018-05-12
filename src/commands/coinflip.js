function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.run = (client, message, args, config) => {
  let output = '';
  if(args[0] === undefined) {
    let side = randomInt(0,1);
    if(side === 0) {
      output = 'I flipped a coin and it landed on heads!';
    } else {
      output = 'I flipped a coin and it landed on tails!';
    }
  } else if(/\d+/.test(args[0])) {
    let times = parseInt(args[0]);
    if(times > config.commandSettings.coinflip.max) {
      message.channel.send(`Number too large, must be at most ${config.commandSettings.coinflip.max}.`);
    } else {
      output += `I flipped a coin ${times} time${((times>1)?'s':'')} and got the following sequence: \`\`\``;
      for(let i = 1; i < times + 1; i++) {
        let side = randomInt(0,1);
        if(side === 0) {
          output += `H`;
        } else {
          output += `T`;
        }
        output += ` `;
        if(i % 10 === 0) {
          output += '\n';
        }
      }
      output += `\`\`\``;
    }
  } else {
    output = 'Please provide a number of times to flip the coin.';
  }
  message.channel.send(output);
};

module.exports.info = {
  "version": "1.0",
  "name": "coinflip",
  "help": "Flip coins!",
  "usage": "",
  "hidden": false
};
