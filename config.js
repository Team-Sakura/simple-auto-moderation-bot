require('dotenv').config();

module.exports = {
  token: process.env.TOKEN,
  /**
   * token
   * String - Строка
   * Внимание крайне не советуем трогать это значение,
   * если вы хотите его изменить:
   *  - Перейдите в .env
   *  - Измените значение TOKEN
   */

  prefix: '!',
  /**
   * prefix
   * String - Строка
   * Желаемый вами префикс
   */

  cooldownDefault: 1,
  /**
   * cooldownDefault
   * Number - Число
   * Стандартное значение куллдауна если он не указан в команде
   */

  muteroleDefault: 'Sakura-mute',
  /**
   * muteroleDefault
   * String - Строка
   * Стандартное название роли мута
   */
};
