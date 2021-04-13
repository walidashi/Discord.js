const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const sendError = require("../util/error");
const prefix = process.env.PREFIX

module.exports = {
  info: {
    name: "ban",
    description: "To ban the mentioned user",
    usage: "[user] [Reason]",
    aliases: ["noreturn"],
  },

  run: async function (client, message, args) {
    if (message.author.codes) return;
    if (!message.content.startsWith(prefix)) return;
  
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.reply("**You don't have enough perms**");
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("**Mention someone**");
    if (
     message.mentions.members.first().roles.highest.position >=
     message.member.roles.highest.position
    )
      return message.channel.send("You can't ban a user higher than you!");
    if (!message.guild.member(user).bannable)
      return message.reply("**My role has to be above the mentioned user**");
        message.guild.member(user).ban();

    message.channel.send(`**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `);
  }
}