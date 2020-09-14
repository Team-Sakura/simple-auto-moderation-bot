module.exports = {
  name: 'ready',
  once: true,
  run: async (bot) => {
    console.log(`Бот ${bot.user.username} был запущен`);
  },
};
