const multiServerLog = { 'default': 0 };

// Importing module
module.exports = {

  name: 'dice',
  description: "this is a dice command!",
  execute(Discord, message, args) {

    const guildName = message.guild.name;
    // Embeding the response
    const embedDice = new Discord.MessageEmbed();
    embedDice.setColor('#FF6600')
      .setAuthor(`Luigi's Cafe`, 'https://i.imgur.com/gmi8bjH.jpg', 'https://www.bruzz.be/luigis-cafe-2012-02-03')
      .setThumbnail('https://i.imgur.com/gmi8bjH.jpg')


    // Functions
    var die1 = Math.floor(Math.random() * 6) + 1;
    var die2 = Math.floor(Math.random() * 6) + 1;
    var dice = die1 + die2;


    console.log("\nMost recent old throw: " + multiServerLog[guildName]);
    console.log(`You rolled: #${dice} [${die1}|${die2}]`);
    console.log("Arguments: " + args[0]);

    embedDice.addFields({ name: `You rolled:`, value: `**#${dice}** [${die1}|${die2}]` });

    //conditions
    const guesses = ["higher", "hoger", "lower", "lager"];

    if (args[0] === 'throw') {
      embedDice.addFields({ name: `*Try guessing!*`, value: "*-vub higher* or *-vub lower*" });
    };

    if (multiServerLog[guildName] === 0 && guesses.includes(args[0])) {
      embedDice.addFields({ name: `*You were the first to roll!*`, value: "Roll again or ask a friend" });
    };

    if (multiServerLog[guildName] > 0 && guesses.includes(args[0])) {
      if ((dice > multiServerLog[guildName] && (args[0] === "higher" || args[0] === "hoger")) || (dice < multiServerLog[guildName] && (args[1] === "lower" || args[0] === "lager"))) {
        embedDice.addFields({ name: `*CORRECT GUESS*`, value: "You got lucky!" });
      }
      else if (dice === multiServerLog[guildName]) {
        embedDice.addFields({ name: `YOU THREW THE SAME!`, value: "The person before you has to finish their glass!" });
      }
      else {
        embedDice.addFields({ name: `*WRONG GUESS*`, value: "Drink a sip from your drink" });
      }
    }

    multiServerLog[guildName] = dice;
    console.log("New most recent old throw:" + multiServerLog[guildName]);

    message.channel.send(embedDice);
    embedDice.fields = [];
    embedDice.footer = [];
  }
}

return