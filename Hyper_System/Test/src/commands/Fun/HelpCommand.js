const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'Fun', []);
  }

  run(client, message, args) {
    message.channel.send(
    
    '**$avatar <user>:** sends the mentioned user\'s avatar\n' + 
    '**$ban <user> :** Bans the mentioned user\n' +
    '**$kick <user> :** Kicks the mentioned user\n' +
    '**$clear <number> :** deletes specific number of messages\n' +
    '**$mute <user> :** mutes the mentioned user\n' +
    '**$unmute <user> :** unmutes the mentioned user\n' +
    '**$tclose :** closes a specific channel\n' +
    '**$topen :** opens a specific channel\n' +
    '**$new :** opens a private ticket\n' +
    '**$close :** closes your ticket\n' +
    '**$rank <username> <password> :** shows score of last competitive games\n'
    
    );
  }
}