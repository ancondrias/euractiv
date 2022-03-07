// Importing module
module.exports = {

  name: 'all',
  description: "lists aaaaaall commands!",
  execute(Discord, client, fs, prefix, message){


    // Embeding the response
    const embedAllCommands = new Discord.MessageEmbed();
    embedAllCommands.setColor('#FF6600')
    .setAuthor('VUB Digital Campus', 'https://i.imgur.com/hRIWwz0.png', 'https://vub.be/')
    .setThumbnail('https://i.imgur.com/hRIWwz0.png')
    .setTitle('Home of Foxxy Bot')


    // Functions
    embedAllCommands.fields = [];
    for(const [key, value] of client.commands) {
      let temp = new Map(Object.entries(value));
      embedAllCommands.addField(prefix + `${key}`, temp.get('description') , true);
    };

    message.channel.send(embedAllCommands);
  }

}