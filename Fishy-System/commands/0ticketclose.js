const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "ticketclose",
    description: "To close your private ticket",
    usage: "",
    aliases: ["close"],
  },

  run: async function (client, message, args) {
    if (!message.guild.roles.cache.some(gg => gg.name === "Support Team"))
        return message.channel.send(` Role needed with this name: \`Support Team\`.`);
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
  },
};