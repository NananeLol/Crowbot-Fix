const {
    readdirSync
} = require('fs');

const login = (client) => {
    const Discord = require("discord.js")
    const logs = require('discord-logs');
    logs(client)
    const disbut = require('discord-buttons');
    disbut(client);
    const tempo = require("./gestion/tempo.js");
    tempo(client)

    client.config = require("../config.json")
    client.cooldown = new Array();
    client.interaction = {}
    client.guildInvites = new Map();
    client.queue = new Map();
    client.commands = new Discord.Collection()
    client.aliases = new Discord.Collection()
    client.snipes = new Map()
    client.inter = new Array()

    client.login('MTQwNjI5MTMyMzIyNDQ2MTMxMg.Gy6yp3.DbyK3YovW0iO8C_seK-cXu-tMDMmqmuahxB_bQ');
}

module.exports = {
    login
}



