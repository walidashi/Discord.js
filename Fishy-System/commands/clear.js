const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {
    var args = message.content.slice(prefix.length).trim().split(/ +/);
    const amount = args[1];

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":no_entry_sign: **Error:** You don't have the **Manage Messages** permission!");
 
    if (args[1] == 'all') {
        message.delete().then
        message.channel.bulkDelete(100, true);
    } else if (amount < 1 || amount > 100) {
        return message.reply('you need to input a number between 1 and 99.');
    } else if (amount>=1 || amount < 100) {
        message.delete().then
        message.channel.bulkDelete(amount, true); return  message.channel.send("```php\nMessages Deleted: " + amount + "\n```").then(msg => {msg.delete({ timeout: 3000 })}).catch(console.error);
    }
}



module.exports.config = {
    name: "clear",
    aliases: ['CLEAR']
}