// Importing module
module.exports = {

  name: 'invite',
  description: "lists the commands!",
  execute(message){


    // Embeding the response
    const Discord = require('discord.js');
    const embedInvite = new Discord.MessageEmbed();

    embedInvite.setColor('#FF6600')
    .setAuthor('Euractiv', 'https://i.imgur.com/hRIWwz0.png', 'https://vub.be/')
    .setThumbnail('https://i.imgur.com/hRIWwz0.png')
    .setTitle('Click here to invite the Euractiv Bot to your server')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=950329706933284904&permissions=19456&scope=bot')
    .setDescription('**For any questions get in touch with:** Høpe#1030');
    //.setImage('https://i.imgur.com/hRIWwz0.png', 'https://discord.com/api/oauth2/authorize?client_id=950329706933284904&permissions=19456&scope=bot')


    // Functions
    message.channel.send(embedInvite);
  }

}
