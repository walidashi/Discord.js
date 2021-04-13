const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "avatar",
    description: "To show avatar of mentioned user",
    usage: "[user]",
    aliases: ["avtr", "image"],
  },

  run: async function (client, message, args) {
    if (!message.channel.guild) return;
    var mentionned = message.mentions.users.first();
    var client;

    if (mentionned) {
      var client = mentionned;
    } else {
      var client = message.author;
    }

    let embed = new Discord.MessageEmbed()
     .setFooter('Requested by: ' + message.author.tag, message.author.displayAvatarURL())
     .setColor("#985ce7")
     .setImage(client.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }));
     message.channel.send(embed)
  }
}
