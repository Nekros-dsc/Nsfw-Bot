const config = require('../config.json');
const Discord = require('discord.js');

module.exports = {
  name: 'messageCreate',
  async execute(message, bot) {
    try {
      if (!message.guild || message.author.bot) return;

      const sendPrefixEmbed = () => {
        const embed = new Discord.EmbedBuilder()
          .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }), url: 'https://discord.gg/uhq' })
          .setTitle('`🪄` ▸ Prefix')
          .setDescription(`> *The bot prefix is \`${config.prefix}\`.*`)
          .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
          .setColor(config.color)
          .setTimestamp();
        return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      };

      if (message.content.startsWith(`<@${bot.user.id}>`)) {
        const args = message.content.slice(`<@${bot.user.id}>`.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) {
          return sendPrefixEmbed();
        }

        const commandFile = bot.commands.get(commandName);
        if (!commandFile) {
          return sendPrefixEmbed();
        }

        await commandFile.run(bot, message, args, config);
      } else if (message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        const commandFile = bot.commands.get(commandName);
        if (!commandFile) return;

        await commandFile.run(bot, message, args, config);
      }
    } catch (e) {
      console.log(e);
    }
  },
};