const Discord = require('discord.js');
const bot = new Discord.Client({ allowedMentions: { repliedUser: false }, intents: 3276799, partials: [Discord.Partials.Channel, Discord.Partials.Message, Discord.Partials.User, Discord.Partials.GuildMember, Discord.Partials.Reaction, Discord.Partials.ThreadMember, Discord.Partials.GuildScheduledEvent] });
bot.commands = new Discord.Collection();
bot.setMaxListeners(70);

bot.login(require('./config.json').token).then(() => { console.log(`[!] — Logged in as ${bot.user.tag} (${bot.user.id})`); }).catch(() => { console.log('\x1b[31m[!] — Please configure a valid bot token\x1b[0m'); });

const commandHandler = require('./Handler/Commands.js')(bot);
const eventdHandler = require('./Handler/Events')(bot);
const anticrashHandler = require('./Handler/anticrash');
anticrashHandler(bot);