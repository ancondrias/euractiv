const drinks = ['1 vinger', '2 vingers', '3 vingers', '4 vingers', 'ad diagonalem', 'ad libitum', 'AAAAD FUNDUUUM!']

// Importing module
module.exports = {

  name: 'codex prosit',
  description: "Gives the amount to drink",
  execute(Discord, message) {

    //Generic embed creator function
    function createEmbedProsit() {
      const embedCodexProsit = new Discord.MessageEmbed();
      embedCodexProsit.setColor('#FF6600')
        .setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
        .setThumbnail('https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
        .setTitle('Prosit senior! ' + randomDrink())
      return embedCodexProsit;
    }

    // Code from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    function randomDrink() {
      const random = getRandomIntInclusive(0, drinks.length - 1);
      return drinks[random];
    }

    const embedProsit = createEmbedProsit();
    message.channel.send(embedProsit)
  }
}