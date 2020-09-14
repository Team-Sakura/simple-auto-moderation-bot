module.exports = {
  name: 'ban',
  aliases: ['apiban'],
  category: 'mod',
  cooldown: 1000,
  async run(bot, message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.channel.send('У вас нету прав для этого надо право\n> `BAN_MEMBERS`');
    }

    if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
      return message.channel.send('У меня нету прав мне надо права\n> `BAN_MEMBERS`');
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send('Укажите пользователя');

    if (member.id === message.guild.owner.id) {
      return message.channel.send('Я не могу кикнуть овнера!');
    }

    const reason = args.slice(1).join(' ') || 'Не указана';
    await member.ban({
      reason: `${message.author.tag} [${reason}]`,
    })
      .then(() => message.channel.send(`Пользователь: ${member.user.tag}(\`${member.id}\`)\nПричина: \`${reason}\`\nКто Забанил: ${message.author.tag}(\`${message.author.id}\`)`))
      .catch((err) => { throw err; });
  },
};
