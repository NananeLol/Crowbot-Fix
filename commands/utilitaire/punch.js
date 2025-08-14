const Discord = require('discord.js');

module.exports = {
  name: 'punch',
  aliases: ['hit'],

  run: async (client, message, args, prefix, color) => {
    const gifs = [
      'https://media.tenor.com/1LQ6dC4ZljEAAAAC/anime-punch.gif',
      'https://media.tenor.com/HyxYO8ZVasEAAAAC/punch-anime.gif',
      'https://media.tenor.com/12b7eJD9P7IAAAAC/anime-fight.gif'
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    const target = message.mentions.users.first();
    let description = `${message.author.username} donne un coup de poing ! 🥊`;
    if (target) description = `${message.author.username} frappe ${target.username} ! 🥊`;

    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(description)
      .setImage(randomGif) // Lien HTTPS valide de Tenor
      .setFooter(client.config.name)
      .setTimestamp();

    console.log(`[CMD] GIF choisi : ${randomGif}`);
    return message.channel.send(embed);
  }
};
