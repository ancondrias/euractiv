// Importing module
module.exports = {

  name: 'invite',
  description: "lists the commands!",
  execute(message){


    // Embeding the response
    const Discord = require('discord.js');
    const embedInvite = new Discord.MessageEmbed();

    embedInvite.setColor('#FF6600')
    .setAuthor('VUB Digital Campus', 'https://i.imgur.com/hRIWwz0.png', 'https://vub.be/')
    .setThumbnail('https://i.imgur.com/hRIWwz0.png')
    .setTitle('Click here to invite Foxxy Bot to your server')
    .setURL('https://discord.com/oauth2/authorize?client_id=778978620601139202&scope=bot&permissions=8')
    .setDescription('**For any questions get in touch with:** Høpe#1030');
    //.setImage('https://i.imgur.com/hRIWwz0.png', 'https://discord.com/oauth2/authorize?client_id=778978620601139202&scope=bot&permissions=8')


    // Functions
    message.channel.send(embedInvite);
  }

}