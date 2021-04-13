const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "tclose",
    description: "To close a certain channel",
    usage: "",
    aliases: ["tclose"],
  },

  run: async function (client, message, args) {
    let role = message.guild.roles.cache.find(role => role.name === "@everyone");
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You don't have Administration**")
    message.channel.updateOverwrite(role, { SEND_MESSAGES: false }); return message.reply("**Chat Closed 🔒**")   
  },
};
