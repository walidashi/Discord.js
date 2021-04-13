const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "clear",
    description: "To delete messages in a text channel",
    usage: "[no of messages to delete]",
    aliases: ["clear"],
  },

  run: async function (client, message, args) {
    const amount = args[0];

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":no_entry_sign: **Error:** You don't have the **Manage Messages** permission!");
 
    if (args[0] == 'all') {
        message.delete().then
        message.channel.bulkDelete(100, true);
    } else if (amount < 1 || amount > 100) {
        return message.reply('you need to input a number between 1 and 99.');
    } else if (amount>=1 || amount < 100) {
        message.delete().then
        message.channel.bulkDelete(amount, true); return  message.channel.send("```php\nMessages Deleted: " + amount + "\n```").then(msg => {msg.delete({ timeout: 3000 })}).catch(console.error);
    } 
  },
};