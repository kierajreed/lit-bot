"use strict";

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
});

fs.readdir("./commands/", (err, files) => {
  console.log(' ');
  if(err) {
    return console.error(err);
  }

  files.forEach(file => {
    let eventFunction = require(`./commands/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loaded command '${eventName}'!`);

    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });

  console.log('All commands loaded!');
  console.log(' ');
});

client.once('ready', () => {
  console.log('Connected to Discord!');
  console.log(' ');
  client.user.setActivity(`for my name...`, {'type': 'WATCHING'});
  rl.prompt();
});

rl.on('line', (line) => {
  if(line.trim() === 'stop') {
    client.user.setStatus('invisible');
    process.exit(0);
  }
  rl.prompt();
});

client.on('message', (message) => {
  if(message.author.bot) {
    return;
  }
  if(message.content.indexOf(config.prefix) !== 0) {
    return;
  }

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command.includes('/') || command.includes('\\')) {
    console.log(`Message by "${message.author.id}" flagged as hack!`);
    message.channel.send('COMMAND FLAGGED AS HACK');
    return;
  }

  if(fs.existsSync(`./commands/${command}.js`)) {
    try {
      const commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args, config);
    } catch (err) {
      console.error(err);
    }
  } else {
    message.channel.send(`Command not found! Try \`${config.prefix}help\` for a list of commands!`);
  }
});

client.on('guildMemberAdd', (member) => {
  if(config.guildEventSettings.hasOwnProperty(member.guild.id)) {
    const channel = member.guild.channels.find('id', config.guildEventSettings[member.guild.id].messageChannel);
    if(!channel) {
      return;
    }
    channel.send(config.guildEventSettings[member.guild.id].add.replace('#MEMBER#', `<@${member.user.id}>`));
  }
  console.log(`Guild Member "${member.user.tag}" Added in ${member.guild.name}`);
});
client.on('guildMemberRemove', (member) => {
  if(config.guildEventSettings.hasOwnProperty(member.guild.id)) {
    const channel = member.guild.channels.find('id', config.guildEventSettings[member.guild.id].messageChannel);
    if(!channel) {
      return;
    }
    channel.send(config.guildEventSettings[member.guild.id].remove.replace('#MEMBER#', `<@${member.user.id}>`));
  }
  console.log(`Guild Member "${member.user.tag}" Removed in ${member.guild.name}`);
});

client.login(config.token);
