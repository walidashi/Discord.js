const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "ticketopen",
    description: "To open a private ticket",
    usage: "",
    aliases: ["new"],
  },

  run: async function (client, message, args) {
    const everyone = message.guild; 
    const support = message.guild.roles.cache.find(r => r.name === 'Support Team'); 
 
      const reason = message.content 
       .split(" ") 
       .slice(1) 
       .join(" "); 
  if (!message.guild.roles.cache.some(gg => gg.name === "Support Team")) 
    return message.channel.send(`لازم تسوي رتبة اسمها \`Support Team\`.`); 
  if ( 
    message.guild.channels.cache.filter( 
      Channel => 
        Channel.name == `ticket-${message.author.id}` && 
        Channel.type == "text" 
    ).size > 0 
  ) 
    return message.channel.send(`You already have a ticket open.`); 
    message.guild 
    .channels.create(`ticket-${message.author.id}`, 'text')  
    .then(c => { 
      let role = message.guild.roles.cache.find(gg => gg.name === "Support Team"); 
      let role2 = message.guild 
      c.overwritePermissions([ 
       { 
         id: message.guild.id, 
         deny: ['VIEW_CHANNEL'], 
       }, 
       { 
         id: message.author.id, 
         allow: ['VIEW_CHANNEL'], 
       }, 
       { 
         id: message.guild.roles.cache.find(r => r.name === 'Support Team').id, 
         allow: ['VIEW_CHANNEL'], 
       }, 
    ]); 
    message.channel.send( 
      `:white_check_mark: Your ticket has been created, ${c}.` 
    ); 
    const embed = new Discord.MessageEmbed() 
      .setColor(0xcf40fa) 
      .addField( 
        `Hey ${message.author.username}!`, 
        `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.`
      )
      .setTimestamp();
    c.send({
      embed: embed
    });
})}}
