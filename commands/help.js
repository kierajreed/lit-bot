function toDifferent (lines, maxLength = 1024) {
  const _ = [lines[0]];
  var cr = 0;
  for (var i = 1; i < lines.length; i++)
  {
    if (_[cr].length + '\n'.length + lines[i].length < maxLength)
    {
      _[cr] += '\n' + lines[i];
    } else {
      cr++;
      _[cr] = lines[i];
    }
  }

  return _;
}

const fs = require('fs');
let helpLines = [];
module.exports.run = (client, message, args, config) => {
  fs.readdir("./commands", (err, files) => {
    if(err) {
      return console.error(err);
    }

    files.forEach(file => {
      const fileModule = require(`./${file}`);
      if(!fileModule.info.hidden){
        helpLines.push(`\`${fileModule.info.name}\`: ${fileModule.info.help}`);
      }
    });

    for(lines of toDifferent(helpLines, 1500)) {
      message.channel.send(lines);
    }
  });
  helpLines = [];
};

module.exports.info = {
  "version": "1.0",
  "name": "help",
  "help": "Display the help message!",
  "usage": "",
  "hidden": false
};
