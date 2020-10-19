const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {
    if (message.author.x5bz) return;
    if (!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    if (message.author.bot) return;
    if (!message.channel.guild)
        return message.reply("** This command is only for servers**");

    if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
    if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
        .split(" ")
        .slice(2)
        .join(" ");
    if (message.mentions.users.size < 1) return message.reply("**Mention someone**");
    if (!reason) return message.reply("**Please specify a reason**");
    if (!message.guild.member(user).kickable)
        return message.reply(
            "**I can't kick someone with a higher role than me**"
        );
    if (
        message.mentions.members.first().roles.highest.position >=
        message.member.roles.highest.position
    )
        return message.channel.send("You can't kick someone with a higher role than you");

    message.guild.member(user).kick();

    const kickembed = new Discord.MessageEmbed()
        .setAuthor(`KICKED!`, user.displayAvatarURL)
        .setColor("RANDOM")
        .setTimestamp()
        .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
        .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
        .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    message.channel.send({
        embed: kickembed
    });
}


module.exports.config = {
    name: "kick",
    aliases: ['Kick']
}