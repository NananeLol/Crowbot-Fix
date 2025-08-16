const Discord = require('discord.js');
const { readdirSync } = require('fs');
const db = require('quick.db');
const ms = require('ms');

// Crée le client
const client = new Discord.Client({
  fetchAllMembers: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'],
  ws: {
    intents: [
      Discord.Intents.FLAGS.DIRECT_MESSAGES,
      Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_BANS,
      Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
      Discord.Intents.FLAGS.GUILD_INVITES,
      Discord.Intents.FLAGS.GUILD_MEMBERS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
      Discord.Intents.FLAGS.GUILD_PRESENCES,
      Discord.Intents.FLAGS.GUILD_VOICE_STATES,
      Discord.Intents.FLAGS.GUILD_WEBHOOKS
    ]
  }
});

// Collections pour commandes
client.commands = new Discord.Collection();

// Gestion des erreurs non catchées
process.on("unhandledRejection", err => {
  if (err) return console.error("Uncaught Promise Error:", err);
});

// Login du bot
const { login } = require('./util/login.js');
login(client);

// Fonction pour charger les commandes
const loadCommands = (dir = './commands') => {
  readdirSync(dir).forEach(subDir => {
    const files = readdirSync(`${dir}/${subDir}`).filter(f => f.endsWith('.js'));
    for (const file of files) {
      const command = require(`${dir}/${subDir}/${file}`);
      client.commands.set(command.name, command);
      console.log(`> Commande chargée : ${command.name} [${subDir}]`);
    }
  });
};

// Fonction pour charger les événements
const loadEvents = (dir = './events') => {
  readdirSync(dir).forEach(subDir => {
    const files = readdirSync(`${dir}/${subDir}`).filter(f => f.endsWith('.js'));
    for (const file of files) {
      const event = require(`${dir}/${subDir}/${file}`);
      const eventName = file.split('.')[0];
      client.on(eventName, event.bind(null, client));
      console.log(`> Event chargé : ${eventName}`);
    }
  });
};

// Charger commandes et événements
loadEvents();
loadCommands();

// Event ready
client.once('ready', () => {
  console.log(`Bot connecté : ${client.user.tag}`);
});
