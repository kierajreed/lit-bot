const request = require('request');
const Discord = require('discord.js');

module.exports.run = (client, message, args, config) => {
  message.channel.send('Fetching random cat...');
  request({
    uri: "http://aws.random.cat/meow"
  }, (error, response, body) => {
    /*
    let pageJson = JSON.parse(body);
    let url = pageJson.file;
    let extension = url.substring(url.length - 4);

    message.channel.send(new Discord.MessageAttachment(url, "cat" + extension));
    */
    message.channel.send("The `random.cat` API is down today.");
  });
};

module.exports.info = {
  "version": "1.2",
  "name": "randomcat",
  "help": "Get a random cat!",
  "usage": "",
  "hidden": false
};
