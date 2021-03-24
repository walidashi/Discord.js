const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('Mute', 'Moderation', []);
  }

  run(client, message, args) {
    const role = message.guild.roles.cache.find(role => role.name === 'Muted');
    const member = message.mentions.members.first();
  
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(":no_entry_sign: **Error:** You don't have the **Mute Members** permission!");
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  
    member.roles.add(role); 
    return message.channel.send('**Muted Successfully!**')
  }
}