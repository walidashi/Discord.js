const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const sendError = require("../util/error");
const prefix = process.env.PREFIX

module.exports = {
  info: {
    name: "unmute",
    description: "To unmute the mentioned user from text",
    usage: "[user]",
    aliases: ["talk"],
  },

  run: async function (client, message, args) {
    const role = message.guild.roles.cache.find(role => role.name === 'Muted');
    const member = message.mentions.members.first();
  
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(":no_entry_sign: **Error:** You don't have the **Mute Members** permission!");
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  
    member.roles.remove(role); 
    return message.channel.send('**Unmuted Successfully!**')
  }
}