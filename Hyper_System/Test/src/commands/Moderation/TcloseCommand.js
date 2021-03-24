const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TcloseCommand extends BaseCommand {
  constructor() {
    super('tclose', 'Moderation', []);
  }

  run(client, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You don't have Administration**")
    message.channel.updateOverwrite('752296491124523058', { SEND_MESSAGES: false }); return message.reply("**Chat Closed 🔒**")
  }
}