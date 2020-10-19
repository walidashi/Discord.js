const Discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (client, message, args, prefix) => {
    var args = message.content.split(" ");
    var command = args[0];
    var num = args[1];
    var tax = 5.3;
    let nume = new Discord.MessageEmbed()
      .setColor('BLACK')
      .setDescription(command + " <number>");
      if (!num) {
      return message.channel.send(nume);
    }
    var numerr = Math.floor(num);
    if (numerr < 0 || numerr == NaN || !numerr) {
      return message.reply("**The value must be correct.**");
    }
    var taxval = Math.floor(numerr * (tax / 100));
    var amount = Math.floor(numerr - taxval);
    var amountfinal = Math.floor(numerr + taxval);
    let taxemb = new Discord.MessageEmbed()
      .setColor('#000000')
      .setAuthor('TAX Calculator', message.author.displayAvatarURL())
      .setDescription('Some description here')
      .setThumbnail("https://cdn.discordapp.com/attachments/734122390816292924/748090165817245697/giphy.gif")
      .setDescription(`Principal amount: **${numerr}**\nTax amount: **${taxval}**\nAmount with tax: **${amount}**\nAmount to be paid: **${amountfinal}**`)
      .setTimestamp()
      .setFooter(`Requested By ${message.author.username}`, message.author.avatarURL);
    message.channel.send(taxemb);
}

module.exports.config = {
    name: "Tax",
    aliases: ['tax']
}