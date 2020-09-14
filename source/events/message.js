const { Collection } = require('discord.js');

const cooldown = new Collection();

const inviteRegex = () => {
  const protocol = '(?:(?:http|https)://)?';
  const subdomain = '(?:www.)?';
  const domain = '(?:disco|discord|discordapp).(?:com|gg|io|li|me|net|org)';
  const path = '(?:/(?:invite))?/([a-z0-9-.]+)';

  const regex = `(${protocol}${subdomain}(${domain}${path}))`;

  return new RegExp(regex, 'i');
};

async function inviteCheck(bot, message) {
  if (!message.member.hasPermission('ADMINISTRATOR') && message.channel.permissionsFor(bot.user.id).has('MANAGE_MESSAGES')) {
    const check = inviteRegex().text(message.content);
    if (check) {
      const invites = '';
      const fetchInvite = await bot.fetchInvite(message.content).catch(null);
      if (fetchInvite.guild.id === message.guild.id) return false;

      if (message.channel.permissionsFor(bot.user.id).has('MANAGE_MESSAGES')) {
        await message.delete().catch(null);
      }

      message.channel.send(`${fetchInvite.guild.name}(\`${fetchInvite.guild.id}\`) ОТ ${message.author}(\`${message.author.id}\`)`);
      return true;
    }
    return false;
  }
  return false;
}

async function cooldownCheck(message, command) {
  if (!cooldown.has(command.name)) {
    cooldown.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldown.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const userCooldown = timestamps.get(message.author.id);
    const expirationTime = userCooldown.now + cooldownAmount;

    if (now < expirationTime) {
      message.react('⏱️').catch(null);
      return true;
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  return false;
}

module.exports = {
  name: 'message',
  once: false,
  run: async (bot, message) => {
    if (message.author.bot) return;

    if (message.channel.type === 'dm') return;

    if (await inviteCheck(bot, message)) return;

    const prefixList = [`${process.env.prefix}`, `<@${bot.user.id}>`, `<@!${bot.user.id}>`];
    const prefixNow = prefixList.find((prefix) => message.content.toLowerCase().startsWith(prefix));
    if (!prefixNow) return;

    const args = message.content.slice(prefixNow.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    const command = bot.commands.get(cmdName)
      || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmdName));
    if (!command) return;

    if (await cooldownCheck(message, command)) return;

    try {
      command.run(bot, message, args);
    } catch (error) {
      message.channel.send(`Ошибка: ${error.message}`, { code: 'js' });
      console.error(error);
    }
  },
};
