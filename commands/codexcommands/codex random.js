// Importing module
module.exports = {

  name: 'codex random',
  description: "this is a random lyrics command!",
  execute(Discord, fs, message, args, lyricsFiles){


    // Embeding the response 
    const embedCodex = new Discord.MessageEmbed();
    embedCodex.setColor('#FF6600')
    .setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
    .setThumbnail('https://i.imgur.com/NNZm9nx.png')

    const random = Math.floor(Math.random() * lyricsFiles.length);
    const randomSong = lyricsFiles[random];

    const lyricstxt = fs.readFileSync(`./lyrics/${randomSong}`, 'utf8');

//      console.log(lyricstxt);
      console.log(lyricstxt.length);
      if (lyricstxt.length <= 1) {
        console.log("less than 1024");
        embedCodex.fields = [];
        embedCodex.addFields({name: randomSong.replace(/.txt/g, ""), value: lyricstxt, inline: false});

        message.channel.send(embedCodex);
      }
      
      else if (lyricstxt.length <= 6000) {
        console.log("less than 6000");


        const { Util, MessageEmbed } = require("discord.js")

        // Returns an array of strings
        const [first, ...rest] = Util.splitMessage(lyricstxt, { maxLength: 1024 })

        // Set base options for embed, initially it has the first 4096 characters of the lyrics
        embedCodex.fields = [];
        embedCodex.addFields({name: randomSong.replace(/.txt/g, ""), value: first})
        // Max characters were not reached so there is no "rest" in the array
        if (!rest.length) {
        // Send just the embed with the first element from the array
          message.channel.send(embedCodex)
        }

        // Get the other parts of the array with max char count
        for (const text of rest) {
        // Add new description to the base embed
          embedCodex.addFields({name: "‎", value: text})

          message.channel.send(embedCodex)
        }
      }
    }
  }
