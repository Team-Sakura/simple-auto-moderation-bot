const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['h'],
  category: 'info',
  cooldown: 1000,
  async run(bot, message) {
    const embed = new MessageEmbed()
      .setAuthor('Все мои команды', message.author.avatarURL())
      .setDescription(`
**Информация**
  ${bot.commands.filter((c) => c.category === 'info').map((c) => `\`${process.env.prefix}${c.name}\``).join(', ')}
**Модерация**
  ${bot.commands.filter((c) => c.category === 'mod').map((c) => `\`${process.env.prefix}${c.name}\``).join(', ')}
**Мой говнокод на гитхабе**
  https://github.com/Team-Sakura/simple-auto-moderation-bot/
**Сервер поддержки**
  https://discord.gg/Eh9thsa/`);
    return message.channel.send(embed);
  },
};
