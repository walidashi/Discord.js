const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {
  const role = message.guild.roles.cache.find(role => role.name === 'Muted');
  const member = message.mentions.members.first();

  if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(":no_entry_sign: **Error:** You don't have the **Mute Members** permission!");
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);

  member.roles.remove(role); 
  return message.channel.send('**Unmuted Successfully!**')
};

module.exports.config = {
  name: "unmute",
  aliases: ['UNMUTE']
}