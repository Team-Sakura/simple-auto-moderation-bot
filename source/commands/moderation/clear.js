module.exports = {
  name: 'clear',
  aliases: ['prune'],
  category: 'mod',
  cooldown: 1,
  async run(bot, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('У вас недостаточно прав для выполнения данного действия\nНужны права\n> `MANAGE_MESSAGES`');

    if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('У меня нету прав\n> `MANAGE_MESSAGES`');

    if (!args[0] || Number.isNaN(args[0])) return message.channel.send('Укажите кол-во сообщений для удаления');

    if (+args[0] > 100) return message.channel.send('Укажите значение от 0 до 100');

    return message.channel.bulkDelete(+args[0])
      .then((messages) => message.channel.send(`Я удалил \`${messages.size}\``))
      .catch((err) => { throw err; });
  },
};
