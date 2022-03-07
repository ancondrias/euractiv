// Importing module
module.exports = {

  name: 'music',
  description: "plays the music bot",
  execute(message, command, args){


    // Functions
    const queue = new Map();
    const ytdl = require("ytdl-core");

    console.log("music bot ready")

    const serverQueue = queue.get(message.guild.id);
    console.log(queue);
    console.log(serverQueue);


  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }


  const songInfo = ytdl.getInfo(args[0]);
  console.log(songInfo);
//  const song = {
//        title: songInfo.videoDetails.title,
//        url: songInfo.videoDetails.video_url,
//   };


  }
}