const Discord = require('discord.js');

exports.help = {
  name: 'help',
  aliases: ['h', 'aide'],
  description: 'Displays the list of commands.',
  use: 'help [command]',
}

exports.run = async (bot, message, args, config) => {
  if (!args[0]) {
    const commandNames = new Set();
    const commandsList = bot.commands.filter(command => {
      if (!commandNames.has(command.help.name)) {
        commandNames.add(command.help.name);
        return true;
      }
      return false;
    }).map(command => {
      return `\`${config.prefix}${command.help.use}\`\n*— ${command.help.description}*`;
    }).join('\n');

    const embed = new Discord.EmbedBuilder()
      .setTitle('`🪄` ▸ Help menu')
      .setDescription(commandsList)
      .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setColor(config.color)
      .setTimestamp();
    return message.reply({ embeds: [embed] });
  } else {
    const command = bot.commands.get(args[0]);
    if (!command) {
      const embed = new Discord.EmbedBuilder()
        .setTitle('\`❌\` ▸ Invalid arguments')
        .setDescription('> *Please provide an existing command.*')
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor('Red')
        .setTimestamp();
      return message.reply({ embeds: [embed] });
    } else {

      const embed = new Discord.EmbedBuilder()
        .setTitle(`\`🪄\` ▸ ${command.help.name}`)
        .setDescription(`> *Command:* \`${config.prefix}${command.help.use}\`\n> *Description:* \`${command.help.description}\`\n> *Aliases:* ${command.help.aliases.map(a => `\`${a}\``).join(', ') || '\`None.\`'}`)
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor(config.color)
        .setTimestamp();
      return message.reply({ embeds: [embed] });
    }
  }
};
