const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {

if (!message.member.hasPermission("ADMINISTRATOR"))
     return message.channel.send(
        "**ADMINISTRATOR ليس لديك صلاحيات :rolling_eyes:**"
    );

    message.channel.send("`#` " + args.join("  "));
    message.delete();
}


module.exports.config = {
    name: "say",
    aliases: ['s']
}