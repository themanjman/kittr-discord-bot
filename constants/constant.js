// Require the necessary discord.js classes
require('dotenv').config()
const token = process.env.BOT_TOKEN; 
const { Client, GatewayIntentBits } = require('discord.js');
const prefix = "!kittr"; 
const API_URL = process.env.API_URL; 

// Create a new client instance
const client = new Client({ 
    intents: 
    [ 
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

exports.client = client
exports.token = token
exports.prefix = prefix
exports.API_URL = API_URL