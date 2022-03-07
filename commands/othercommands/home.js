// Importing module
module.exports = {

  name: 'home',
  description: "Homescreen!",
  execute(Discord, prefix, message){

    // Embeding the response
    const embedHome = new Discord.MessageEmbed();
    embedHome.setColor('#FF6600')
    .setAuthor('VUB Digital Campus', 'https://i.imgur.com/hRIWwz0.png', 'https://vub.be/')
    .setThumbnail('https://i.imgur.com/hRIWwz0.png')
    .setTitle('Home of Foxxy Bot')
    embedHome.addField(prefix + "codex", "Codex Commands", true);
    embedHome.addField(prefix + "dice", "Dice Commands", true)
    embedHome.addField(prefix + "all", "More Commands", true)

    // Functions
    message.channel.send(embedHome);
  }

}