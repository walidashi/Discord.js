const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TopenCommand extends BaseCommand {
  constructor() {
    super('topen', 'Moderation', []);
  }

  run(client, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You don't have Administration**")
    message.channel.updateOverwrite('752296491124523058', { SEND_MESSAGES: true }); return message.reply("**Chat Opened 🔓**")   
  }
}