const Discord = require('discord.js');
const client = new Discord.Client()
const hook = new Discord.WebhookClient('756292649622831195', 'WiYusv6JLqwuqEgxJLH4i8GbS6voQp6ovNrSxoUV3lvPtJ91PuVs7XXnkuA7tcHlokZN');

let prefix = '-';
client.login('NzM0Njk5NjY0OTAwNzUxNDMz.XxVgYg.KbtDbPAOSVYvzUGzClIvPtXXvnE');

//Bot Status
client.on("ready", () => {
   console.log(`Logged in as ${client.user.tag}!`);

   client.user.setStatus("idle");
   client.user.setActivity("-whelp");
});

//Help
client.on("message", message => {
   var args = message.content.split(" ");
   var command = args[0];
   if (command == prefix + "whelp") {
      message.channel.send('Usage: ``-send <message> <numberOfThreads>``')
   }
});

//Main Send Command
client.on("message", message => {
   var args = message.content.split(" ");
   var pizza = '10';
   var command = args[0];
   var msg = args[1];
   var no = args[2];
   if (command == prefix + "send") {
      if(!no){
         for(pizza = 0;pizza < 10;pizza++){
            hook.send(`${msg}`)
         }
        message.channel.send('Number set to 10 automatically');
      }
      for(pizza = 0;pizza < no;pizza++){
         hook.send(`${msg}`)
      }
   } 

});


//Spam Command
/*client.on("message", message => {
   var args = message.content.split(" ");
   var pizza = '10';
   var command = args[0];
   var msg = args[1];
   var no = args[2];
   if (command == prefix + "spam") {
      for(pizza = 0;pizza < 500;pizza++){
         hook.send(`${msg}`)
      }
   } 

})*/