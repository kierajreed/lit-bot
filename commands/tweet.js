const tConfig = require('../config.json');
const Twitter = require('twitter-node-client').Twitter;
const twitter = new Twitter(tConfig.twitterApiInfo);
const errorF = (err, response, body) => {console.log('ERROR! [%s]', err)};
const successF = function (data) {console.log('Tweet Sent! [%s]', data)};

module.exports.run = (client, message, args, config) => {
  message.channel.send('IN PROGRESS!');
  if(!config.admins.includes(message.author.id)) {
    return message.reply(config.messages.global.commandPermissionError);
  }

  if(args[0] === "-id") {
    console.log('TODO CODE ID LOOKUP');
  } else {
    let rawTweet = message.content.substring(config.prefix.length + 6);
    console.log(rawTweet);

    // twitter.postTweet(rawTweet.replace('@', ''), errorF, successF);
  }
};

module.exports.info = {
  "version": "1.0",
  "name": "tweet",
  "help": "Tweet using the basic-bot account! Must be a basic-bot admin to use.",
  "usage": "",
  "hidden": false
};
