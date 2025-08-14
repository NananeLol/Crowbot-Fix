const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'punch',
    aliases: [], // tu peux mettre des raccourcis ici, ex: ["hit"]

    run: async (client, message, args, prefix, color) => {
        let perm = "";
        message.member.roles.cache.forEach(role => {
            if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true;
            if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true;
            if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true;
        });

        if (
            client.config.owner.includes(message.author.id) ||
            db.get(`ownermd_${client.user.id}_${message.author.id}`) === true ||
            perm ||
            db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true
        ) {
            // Liste de gifs
            const gifs = [
                'https://media.giphy.com/media/xUOwGdnPZ3r3D1c4uk/giphy.gif',
                'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
                'https://media.giphy.com/media/l1J9s6Gg5vQXk0J4c/giphy.gif'
            ];
            const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

            // Si l'utilisateur mentionne quelqu'un
            const target = message.mentions.users.first();
            let description = `${message.author.username} donne un coup de poing ! 🥊`;
            if (target) {
                description = `${message.author.username} donne un coup de poing à ${target.username} ! 🥊`;
            }

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(description)
                .setImage(randomGif)
                .setFooter(client.config.name)
                .setTimestamp();

            return message.channel.send({ embeds: [embed] });
        }
    }
};
