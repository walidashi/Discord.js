const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../config.json");

module.exports = {
  name: "queue",
  description: "Get all the song name which are in queue",
  execute: (client, message, args) => {
    let embed = new MessageEmbed().setColor(COLOR);
    const { channel } = message.member.voice;

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/");
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("There is nothing in the queue");
      return message.channel.send(embed);
    }

    embed.setDescription(
      `${serverQueue.songs
        .map((song, index) => index + 1 + ". " + song.title)
        .join("\n\n")}`,
      { split: true }
    );
    embed.setThumbnail('https://cdn.discordapp.com/attachments/646439253072674836/763870521325518848/8c07e9507abd31da62b8ed2ba8e02979.gif')
    
    message.channel.send(embed);
  }
};
