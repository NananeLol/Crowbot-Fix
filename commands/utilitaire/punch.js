const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'punch',
    description: 'Envoie un GIF de coup de poing',
    execute(message, args) {
        const gifs = [
            'https://media.giphy.com/media/xUOwGdnPZ3r3D1c4uk/giphy.gif',
            'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
            'https://media.giphy.com/media/l1J9s6Gg5vQXk0J4c/giphy.gif'
        ];

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`${message.author.username} donne un coup de poing !`)
            .setImage(randomGif);

        message.channel.send({ embeds: [embed] });
    }
};
