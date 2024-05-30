const fs = require('fs');

module.exports = (bot) => {
  const eventFiles = fs.readdirSync('./Events/').filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(`../Events/${file}`);

    if (event.once) {
      bot.once(event.name, (...args) => event.execute(...args, bot));
    } else {
      bot.on(event.name, (...args) => event.execute(...args, bot));
    }
        //console.log(`[EVENT] ▸ ${file}`);
  }

  const eventSubFolders = fs.readdirSync('./Events/').filter((folder) => !folder.endsWith('.js'));

  for (const folder of eventSubFolders) {
    const subEventFiles = fs.readdirSync(`./Events/${folder}/`).filter((file) => file.endsWith('.js'));

    for (const file of subEventFiles) {
      const event = require(`../Events/${folder}/${file}`);

      if (event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot));
      } else {
        bot.on(event.name, (...args) => event.execute(...args, bot));
      }
            //console.log(`[EVENT] ▸ ${file} - ${folder}`);
    }
  }
};