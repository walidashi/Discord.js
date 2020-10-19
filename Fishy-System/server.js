const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()

const config = require("./config.js");

client.commands = new Discord.Collection();
client.aliases =  new Discord.Collection();
client.config = require('./config.js');

fs.readdir("./commands/", (err, files) => {
    //it will filter all the files in commands directory with extension .js
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    //this will be executed if there is no files in command folder with extention .js
    if(jsfile.length <= 0) return console.log("Could not find any commands!");
    //it's similar to for loop
    jsfile.forEach((f, i) => { 
     //it will log all the file names with extension .js
    console.log(`Loaded ${f}!`);
        
    let pull = require(`./commands/${f}`);
   
    client.commands.set(pull.config.name, pull);  
    pull.config.aliases.forEach(alias => {
    client.aliases.set(alias, pull.config.name)
                
    });
})});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`); 
  client.user.setActivity('$help', { type: "WATCHING"})
});


client.on('message', async message => {
  
    if(!message.guild || message.author.bot) return;
         
    if (message.content.indexOf(config.prefix) !== 0) return;
 
    let args = message.content.slice(config.prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();
    const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    
    if(!commandFile) return;
   
    try {
      commandFile.run(client, message, args, config.prefix);
    } catch(e) {
      return message.channel.send(`An error occured on ${command}:\n ${e.message}`)
    }
         
});

//Leave Log
client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'leave');
  if (!channel) return;
  channel.send(`${member} left the server!`);
});

//Welcome log
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'leave');
	if (!channel) return;

	channel.send(`${member} joined the server!`);
});
 

client.login(config.token_bot); //This is the heart of the bot