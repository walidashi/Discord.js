const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {
    if (!message.guild.roles.cache.some(gg => gg.name === "Support Team"))
        return message.channel.send(` لازم تسوي رتبة اسمها \`Support Team\`.`);
    if (!message.channel.name.startsWith("ticket-"))
        return message.channel.send("This isn't a ticket channel!");
    if (
        !message.member.roles.cache.has(
            message.guild.roles.cache.filter(r => r.name === "Support Team").first().id
        )
    )
        return message.channel.send("You don't have the `Support Team` role!");
    message.channel
        .delete()
        .catch(e => message.channel.send("Check my permissions!"));
}


module.exports.config = {
    name: "tclose",
    aliases: ['tc']
}