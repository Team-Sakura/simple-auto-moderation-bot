const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join: pathJoin } = require('path');

const bot = new Client({
  disableMentions: 'everyone',
});
bot.config = require('../config.js');

bot.commands = new Collection();

function commandsLoad() {
  const commandsPath = pathJoin(__dirname, './commands');
  const commandFolder = readdirSync(commandsPath);
  for (const file1 of commandFolder) {
    if (file1.endsWith('.js')) {
      const fileRequire = pathJoin(commandsPath, file1);
      const command = require(fileRequire);
      if (command.name) {
        bot.commands.set(command.name, command);
      }
      // delete require.cache[require.resolve(fileRequire)]
    } else {
      let nextFolder = pathJoin(commandsPath, file1);
      nextFolder = readdirSync(nextFolder);
      for (const file2 of nextFolder) {
        if (file2.endsWith('.js')) {
          const fileRequire = pathJoin(commandsPath, file1, file2);
          const command = require(fileRequire);
          if (command.name) {
            bot.commands.set(command.name, command);
          }
          // delete require.cache[require.resolve(fileRequire)]
        }
      }
    }
  }

  console.log(`Загруженно ${bot.commands.size} команд`);
}

function eventsLoad() {
  const eventsPath = pathJoin(__dirname, './events');
  const eventsFolder = readdirSync(eventsPath);
  let index = 0;
  for (const file of eventsFolder) {
    if (file.endsWith('.js')) {
      const fileRequire = pathJoin(eventsPath, file);
      const event = require(fileRequire);
      if (event.once) {
        bot.once(event.name, event.run.bind(null, bot));
      } else {
        bot.on(event.name, event.run.bind(null, bot));
      }
      // delete require.cache[require.resolve(fileRequire)]
      index += 1;
    }
  }

  console.log(`Загруженно ${index} ивентов`);
}

commandsLoad();
eventsLoad();
bot.login(bot.config.token);
