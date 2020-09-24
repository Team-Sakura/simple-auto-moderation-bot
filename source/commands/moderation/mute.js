const ms = require('ms');

module.exports = {
  name: 'mute',
  aliases: ['shutup'],
  category: 'mod',
  cooldown: 1,
  async run(bot, message, args) {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
      return message.channel.send('У вас недостаточно прав для выполнения данного действия\nНужны права\n> `MANAGE_ROLES`');
    }

    if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
      return message.channel.send('У меня нету прав\n> `MANAGE_ROLES`');
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send('Укажите пользователя');

    if (member.id === message.guild.owner.id) {
      return message.channel.send('Я не могу замутить овнера!');
    }

    if (message.guild.me.roles.highest.rawPosition <= member.roles.highest.rawPosition) {
      return message.channel.send('Я не могу замутить пользователя выше меня');
    }

    let muterole = message.guild.roles.cache.find((r) => r.name === bot.config.muteroleDefault);
    if (!muterole) {
      muterole = await message.guild.roles.create({
        data: {
          name: bot.config.muteroleDefault,
        },
      });
    }

    for (const channel of await message.guild.channels.cache) {
      channel.updateOverwrite(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
      });
    }

    if (member.roles.cache.has(
      message.guild.roles.cache.find((r) => r.name === bot.config.muteroleDefault).id,
    )
    ) {
      return message.channel.send('Этот пользователь уже в муте');
    }

    const reason = args.split(1).join(' ') || 'Не указанна';

    member.roles.add(muterole.id)
      .then(() => message.channel.send(`Пользователь: ${member.user.tag}(\`${member.id}\`)\nПричина: \`${reason}\`\nКто Замутил: ${message.author.tag}(\`${message.author.id}\`)`))
      .catch((err) => { throw err; });

    await message.react('✅');
    setTimeout(() => {
      member.roles.remove(muterole.id).catch(null);
      message.channel.send(`${member} теперь может говорить!`);
    }, ms(args[2]));
    return null;
  },
};
