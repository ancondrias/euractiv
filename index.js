// Importing Discord modules
const Discord = require('discord.js');


// Defining the client of the VUB Discord Bot
const client = new Discord.Client();


// Defining the prefix of the VUB Discord Bot
let prefixes = { 'default': '-' };


// Defining file system
const fs = require('fs');

//returning commands of the VUB Discord Bot
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
};

//returning 'codex' commands of the VUB Discord Bot
const codexcommandsFolder = fs.readdirSync(`./commands/codexcommands`).filter(codexcommandsFile => codexcommandsFile.endsWith('.js'));
for (const file of codexcommandsFolder) {
  const codexcommand = require(`./commands/codexcommands/${file}`);
  client.commands.set(codexcommand.name, codexcommand);
};

//returning 'other' commands of the VUB Discord Bot
const othercommandFolder = fs.readdirSync(`./commands/othercommands`).filter(file => file.endsWith('.js'));
for (const file of othercommandFolder) {
  const othercommand = require(`./commands/othercommands/${file}`);
  client.commands.set(othercommand.name, othercommand);
};

client.commands.sort();
client.commands.sort();

// Read prefixfiles and add them to the dictionary
function refreshPrefixes() {
  let prefixFiles = fs.readdirSync(`./prefixes/`).filter(file => file.endsWith('.txt'));
  for (file of prefixFiles) {
    const serverName = file.replace('prefix', '').replace(/.txt/g, '');
    const emoji = fs.readFileSync(`./prefixes/${file}`, 'utf8');
    prefixes[serverName] = emoji;
  }
  console.log(prefixes);
}

// Once VUB Bot is ready, it sets activity and logs in console that it is ready.
client.once('ready', () => {
  refreshPrefixes();
  console.log('Foxxy Bot is online!');
  let clientguilds = client.guilds.cache;
  console.log(clientguilds.map(g => g.name) || "None")

  client.user.setActivity('Cantusseeeen', {
    type: 'PLAYING'
    //      type: 'STREAMING', url:"https://www.twitch.tv/stvebsg"
  })

});

client.on('message', message => {
  let prefix = prefixes[message.guild.name];
  if (!prefix) {
    prefix = prefixes['default'];
  }

  //Checks if the message starts with prefix and isn't written by the bot.
  if (!message.content.startsWith(prefix) || message.author.bot) return;


  //trim() cuts off leading and trailing whitespaces
  const args = message.content.toLowerCase().replace(prefix, "").trim().split(' ');
  const command = args[0];

  switch (command) {
    case 'help':
      client.commands.get('home').execute(Discord, prefix, message);
      break;
    case 'home':
      client.commands.get('home').execute(Discord, prefix, message);
      break;
    case 'all':
      client.commands.get('all').execute(Discord, client, fs, prefix, message);
      break;
    case 'invite':
      client.commands.get('invite').execute(message);
      break;
    case 'embed':
      client.commands.get('embed').execute(Discord, message);
      break;
    case 'twitch':
      client.commands.get('twitch').execute(message);
      break;
    case 'prefix':
      if (!message.member.permissions.has(0x00000008)) { // Only admin allowed
        message.channel.send('You are not allowed to change my prefix');
      }
      else {
        const guildName = message.guild.name;
        console.log('Setting emoji ' + args[1] + ' for ' + guildName);
        fs.writeFile('./prefixes/prefix' + guildName + '.txt', args[1], (err) => 0);
        prefixes[guildName] = args[1];
        message.channel.send('Prefix updated to: ' + args[1]);
      }
      break;

    //codex commands
    case 'codex':
      args.shift();
      client.commands.get('codex').execute(Discord, client, fs, prefix, message, args);
      break;
    case 'lyrics':
    case 'random':
    case 'index':
    case 'prosit':
      client.commands.get('codex').execute(Discord, client, fs, prefix, message, args);
      break;


    //dice commands
    case 'dice':
      args.shift();
      client.commands.get('dice').execute(Discord, message, args);
      break;
    case 'throw':
    case 'higher':
    case 'lower':
    case 'hoger':
    case 'lager':
      client.commands.get('dice').execute(Discord, message, args);
      break;


    //music commands

    case 'play'://example of fall through. play, skip and stop will all send 'not yet implemented'
    case 'skip':
    case 'stop':
      message.channel.send("Not yet implemented, maybe if you ask the devs nicely they will speed up the process");
      break;

    default:
      client.commands.get('home').execute(Discord, prefix, message);
      break;
  };

  /*else if (command === `play` || command === `skip` || command === `stop`) {
    client.commands.get('music').execute(message, command, args);
  }

  else {
    message.channel.send("Command not found, please consult *-vub help*");
  };*/

  //console.log("ENDLOG: check")

})

client.login(process.env.DISCORD_TOKEN);