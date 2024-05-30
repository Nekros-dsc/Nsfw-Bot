const Discord = require('discord.js');
const axios = require('axios');

exports.help = {
  name: 'hentai',
  aliases: [],
  description: 'Displays a NSFW hentai image.',
  use: 'hentai',
}

exports.run = async (bot, message, args, config) => {
  if (config.nsfwChannel && !message.channel.nsfw) {
    const embed = new Discord.EmbedBuilder()
    .setTitle('`❌` ▸ Not NSFW channel')
    .setDescription(`> *This command can only be used in NSFW channels.*`)
    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setColor('Red')
    .setTimestamp();
    return message.reply({ embeds: [embed] });
  }

  try {
    const response = await axios.get('https://nekobot.xyz/api/image?type=hentai');

    const embed = new Discord.EmbedBuilder()
      .setTitle('`🔞` ▸ NSFW Hentai Image')
      .setImage(response.data.message)
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setColor(config.color)
      .setTimestamp();

    const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setEmoji('📎')
          .setLabel(' ▸ Link')
          .setStyle(Discord.ButtonStyle.Link)
          .setURL(response.data.message)
      );

    return message.reply({ embeds: [embed], components: [row] });
  } catch {
    const embed = new Discord.EmbedBuilder()
    .setTitle('`❌` ▸ Error occurred')
    .setDescription(`> *An error occurred while fetching the image. Please try again later.*`)
    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setColor('Red')
    .setTimestamp();
    return message.reply({ embeds: [embed] });
  }
};