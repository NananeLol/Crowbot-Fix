const Discord = require('discord.js');

module.exports = {
  name: 'punch',
  aliases: ['hit'],

  run: async (client, message, args, prefix, color) => {
    console.log(`[CMD TEST] punch triggered by ${message.author.tag}`);
    const gifs = [
      'https://media.giphy.com/media/xUOwGdnPZ3r3D1c4uk/giphy.gif',
      'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
      'https://media.giphy.com/media/l1J9s6Gg5vQXk0J4c/giphy.gif'
    ];
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    const target = message.mentions.users.first();
    let description = `${message.author.username} donne un coup de poing ! 🥊`;
    if (target) description = `${message.author.username} frappe ${target.username} ! 🥊`;

    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(description)
      .setImage(randomGif)
      .setFooter(client.config.name)
      .setTimestamp();

    return message.channel.send(embed);
  }
};
