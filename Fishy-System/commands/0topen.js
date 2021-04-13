const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "topen",
    description: "To open a certain channel",
    usage: "",
    aliases: ["topen"],
  },

  run: async function (client, message, args) {
    let role = message.guild.roles.cache.find(role => role.name === "@everyone");
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You don't have Administration**")
    message.channel.updateOverwrite(role, { SEND_MESSAGES: true }); return message.reply("**Chat Opened 🔓**")   
  },
};