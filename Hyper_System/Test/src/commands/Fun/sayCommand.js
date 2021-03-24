const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ReplyCommand extends BaseCommand {
  constructor() {
    super('say', 'Fun', []);
  }

  run(client, message, args) {
    message.channel.send("`#` " + args[0]);
    message.delete();
  }
}