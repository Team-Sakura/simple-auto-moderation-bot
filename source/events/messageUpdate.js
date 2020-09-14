const message = require('./message.js');

module.exports = {
  name: 'messageUpdate',
  once: false,
  async run(bot, oldMsg, newMsg) {
    if (oldMsg.author.id === bot.user.id) return;
    if (oldMsg.author.bot) return;
    message.run.bind(null, bot);
    message.run(newMsg);
  },
};
