const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "say",
    description: "To say what you want to say",
    usage: "[message]",
    aliases: ["tell"],
  },

  run: async function (client, message, args) {
    message.channel.send("`# " + args[0] + "`");
    message.delete();
  }
}
