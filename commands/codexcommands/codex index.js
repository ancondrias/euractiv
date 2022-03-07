// The emoji to react for next page
const nextEmoji = '👉'

// The emoji for previous page
const previousEmoji = '👈'

// Importing module
module.exports = {

  name: 'codex index',
  description: "index of codex songs!",
  execute(Discord, message, prefix, lyricsFiles) {

    //Generic embed creator function
    function createEmbedCodex() {
      const embedCodexIndex = new Discord.MessageEmbed();
      embedCodexIndex.setColor('#FF6600')
        .setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
        .setThumbnail('https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
        .setTitle('Index of songs')
        .setDescription('__To look up the lyrics use: __*' + prefix + ' codex lyrics [songname]*');
      return embedCodexIndex;
    }

    // Embeding the response
    let embedCodexIndex = createEmbedCodex();

    let embedLimit = 24;

    // Remember previous embeds when scrolling
    let cachedEmbeds = [];

    // Functions
    function switchPage(index, embedSent, collector) {
      // Returns a closure that knows the given index so it can be applied on collect
      function actualSwitch(reaction, user) {
        const previous = reaction.emoji.name === previousEmoji;
        reaction.users.remove(user); // This line removes the reaction from the embed message, users can re-react easier 
        if (previous) { // Pop the previous cache and index instead of looking in lyricsFiles
          if (cachedEmbeds.length != 0) {
            cache = cachedEmbeds.pop(); // Pops an array: [cachedEmbed, cachedIndex]
            embedCodexIndex = cache[0];
            index = cache[1];
          }
          else
            return; // There is no previous to load, do nothing
        }
        else {
          if (index != lyricsFiles.length) { // If not on last page, remember previous and it's last index to start from
            // Add to front
            cachedEmbeds.push([embedCodexIndex, index]);
          }
          else {
            console.log('Last page reached');// Don't do anything when on last page
            return;
          }
          // Refresh the embed (clearing it)
          embedCodexIndex = createEmbedCodex();
          embedLimit = 24;

          for (index; index < lyricsFiles.length; index++) { // Increment on index so it remembers where to start on next
            if (embedLimit == 0 && index < lyricsFiles.length) {
              break; // Stop early since trying to add more is useless
            }
            else {
              embedCodexIndex.addField(lyricsFiles[index].toString().replace(/.txt/g, ""), "\u200b", true);
              embedLimit--;
            }
          }
        }
        embedSent.edit(embedCodexIndex);
      }
      return actualSwitch; // Returns the closure to be used by the listener
    }

    function removeCache(embedSent) {
      cachedEmbeds = []; // Removes the previous page for on timeout
      embedSent.reactions.removeAll(); // Remove reactions such that no one can interfere with them anymore
    }

    function createReactionListener(index, embedSent) {
      // Filter out everything but the next and previous emojis
      const filter = (reaction, _) => reaction.emoji.name === nextEmoji || reaction.emoji.name === previousEmoji;
      // Stop after 10 seconds of idle activity and remove all reactions
      const collector = embedSent.createReactionCollector(filter, { idle: 10000, dispose: true });
      // Remember, switchPage returns a closure to be applied. It's just used for the extra arguments
      collector.on('collect', switchPage(index, embedSent, collector));
      collector.on('end', _ => removeCache(embedSent));
    }

    function checkOverflow(overflow, embedSent) {
      // Only place emojis and listeners on overflow
      if (overflow > 0) {
        embedSent.react(previousEmoji) // Async with then to react in order
          .then(() => embedSent.react(nextEmoji)
            .then(() => { createReactionListener(overflow, embedSent) }))
          .catch((err) => console.log('Emoji react failed: ' + err));
      }
    }

    for (let i = 0; i < lyricsFiles.length; i++) {
      if (embedLimit == 0 && i < lyricsFiles.length) {
        message.channel.send(embedCodexIndex).then((m) => { checkOverflow(i, m) });
        break;
      }
      else {
        embedCodexIndex.addField(lyricsFiles[i].toString().replace(/.txt/g, ""), "\u200b", true);
        embedLimit--;
      }
    }
    cachedEmbeds = []; // If a new index is asked, clear cachedEmbeds
  }
}