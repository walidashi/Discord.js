const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {

  message.author.send(`My commands are:
  **${prefix}avatar** displays mentioned users avatar
  **${prefix}tax <number>** calculates ProBot tax
  **${prefix}say <blabla>** I will say what is after the command`)
  message.react('✅')
}
module.exports.config = {
    name: "Help",
    aliases: ['help']
}