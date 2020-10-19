const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {
    message.channel.send("Pinging...").then(m =>{
        var ping = m.createdTimestamp - message.createdTimestamp;
        var botPing = Math.round(client.pi);

        m.edit(`**:ping_pong: Pong! Your Ping Is:-**\n  ${ping}ms`);
})}


module.exports.config = {
    name: "ping",
    aliases: ['Ping']
}