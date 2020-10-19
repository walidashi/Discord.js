const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {

 if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You don't have Administration**")
 message.channel.updateOverwrite('752296491124523058', { SEND_MESSAGES: true }); return message.reply("**Chat Opened 🔓**")

}

module.exports.config = {
    name: "open",
    aliases: ['open']
}