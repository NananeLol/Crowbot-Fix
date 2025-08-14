const Discord = require('discord.js');
const db = require('quick.db');

// petit garde pour éviter double envoi si jamais le run est appelé 2x pour le même message
const recentMessages = new Set();

module.exports = {
  name: 'punch',
  aliases: ['hit'],

  run: async (client, message, args, prefix, color) => {
    try {
      // sécurité : ignore les bots (au cas où)
      if (message.author.bot) return;

      // garde anti-doublon (1.5s)
      if (recentMessages.has(message.id)) {
        console.log('[CMD] doublon ignoré pour', message.id);
        return;
      }
      recentMessages.add(message.id);
      setTimeout(() => recentMessages.delete(message.id), 1500);

      const gifs = [
        'https://media.tenor.com/1LQ6dC4ZljEAAAAC/anime-punch.gif',
        'https://media.tenor.com/HyxYO8ZVasEAAAAC/punch-anime.gif',
        'https://media.tenor.com/12b7eJD9P7IAAAAC/anime-fight.gif'
      ];
      const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
      console.log('[CMD] GIF choisi :', randomGif);

      const target = message.mentions.users.first();
      let description = `${message.author.username} donne un coup de poing ! 🥊`;
      if (target) description = `${message.author.username} frappe ${target.username} ! 🥊`;

      const embed = new Discord.MessageEmbed()
        .setColor(color || '#ff0000')
        .setDescription(description)
        .setImage(randomGif)
        .setFooter(client.config ? client.config.name : '')
        .setTimestamp();

      // détecte la version de discord.js si possible
      let djMajor = null;
      try {
        djMajor = Discord.version ? parseInt(Discord.version.split('.')[0]) : null;
      } catch (e) { djMajor = null; }

      // Envoi : on essaye la manière recommandée (v13+), sinon fallback (v12)
      if (djMajor && djMajor >= 13) {
        try {
          await message.channel.send({ embeds: [embed] });
          console.log('[CMD] Envoi OK via { embeds: [embed] } (v13+)');
          return;
        } catch (err) {
          console.warn('[CMD] Envoi via { embeds } a échoué, err:', err);
          // on continue vers fallback
        }
      } else {
        // v12 ou inconnue : méthode classique
        try {
          await message.channel.send(embed);
          console.log('[CMD] Envoi OK via message.channel.send(embed) (v12)');
          return;
        } catch (err) {
          console.warn('[CMD] Envoi via message.channel.send(embed) a échoué, err:', err);
        }
      }

      // dernier fallback : envoyer le GIF en tant que "file" (cela force l'affichage)
      try {
        await message.channel.send({ content: description, files: [randomGif] });
        console.log('[CMD] Envoi OK via files fallback');
        return;
      } catch (err) {
        console.error('[CMD] Tous les envois ont échoué :', err);
        return message.channel.send("Impossible d'envoyer le GIF (erreur).");
      }
    } catch (err) {
      console.error('[CMD] Erreur inattendue dans punch:', err);
    }
  }
};
