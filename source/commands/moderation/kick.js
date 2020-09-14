module.exports = {
  name: 'kick',
  aliases: ['fuckoff'],
  category: 'mod',
  cooldown: 1000,
  async run(bot, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send('У вас недостаточно прав для выполнения данного действия\nНужны права\n> `KICK_MEMBERS`');
    }

    if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
      return message.channel.send('У меня нету прав\n> `KICK_MEMBERS`');
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send('Укажите пользователя');

    if (member.id === message.guild.owner.id) {
      return message.channel.send('Я не могу кикнуть овнера!');
    }

    if (message.guild.me.roles.highest.rawPosition <= member.roles.highest.rawPosition) {
      return message.channel.send('Я не могу кикнуть пользователя выше меня');
    }

    const reason = args.slice(1).join(' ') || 'Не указанна';
    await member.kick({
      reason: `${message.author.tag} [${reason}]`,
    })
      .then(() => message.channel.send(`Пользователь: ${member.user.tag}(\`${member.id}\`)\nПричина: \`${reason}\`\nКто Кикнул: ${message.author.tag}(\`${message.author.id}\`)`))
      .catch((err) => { throw err; });
  },
};
