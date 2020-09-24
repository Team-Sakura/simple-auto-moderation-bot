module.exports = {
  name: 'ping',
  aliases: ['p'],
  category: 'info',
  cooldown: 1,
  async run(bot, message) {
    return message.channel.send('🕐').then((m) => {
      m.edit(`Мой пинг: \`${Math.round(bot.ws.ping)}\` ms`);
    });
  },
};
