// Importing module
module.exports = {

  name: 'codex',
  description: "lists the codex commands!",
  execute(Discord, client, fs, prefix, message, args) {


    // Embeding the response
    const embedCodex = new Discord.MessageEmbed();
    embedCodex.setColor('#FF6600')
      .setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
      .setThumbnail('https://i.imgur.com/NNZm9nx.png')
      .setTitle('Codex Commands')


    // Functions
    const lyricsFiles = fs.readdirSync(`./lyrics/`).filter(file => file.endsWith('.txt'));

    switch (args[0]) {
      case 'prosit':
        client.commands.get('codex prosit').execute(Discord, message);
        break;
      case 'index':
        client.commands.get('codex index').execute(Discord, message, prefix, lyricsFiles);
        break;
      case 'random':
        client.commands.get('codex random').execute(Discord, fs, message, args, lyricsFiles);
        break;
      case 'lyrics':
        args.shift();
        client.commands.get('codex lyrics').execute(Discord, fs, message, args, lyricsFiles);
        break;
      default: //This means no other commands were given to -vub codex
        embedCodex.addField(prefix + `codex index`, 'Find a list of songs that have been fed into this bot', true);
        embedCodex.addField(prefix + `codex lyrics [search words]`, 'Find the lyrics of the desired song by entering tag words.', true);
        embedCodex.addField(prefix + `codex random`, 'Get the lyrics of a random song.', true);
        embedCodex.addField(prefix + 'home', 'To get an overiew of all the commands of the bot.', true);
        embedCodex.addField(prefix + 'codex prosit', 'To get a random amount to drink', true);
        message.channel.send(embedCodex);
    }
  }
}