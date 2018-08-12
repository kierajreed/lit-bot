const {Bot} = require('quick-bot');
const fs = require('fs');

const client = new Bot()
  .setPrefix('!')
  .setConfig(require('./config.json'));

fs.readdir('./commands', (err, files) => {
  files.forEach((file) => {
    client.addCommand(require(`./commands/${file}`));
  });
});

client.build(require('./auth.js'));
