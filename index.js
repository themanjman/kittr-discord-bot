const client = require("./constants/constant.js").client;
const token = require("./constants/constant.js").token;
const prefix = require("./constants/constant.js").prefix;
const commands = require('./router/commands.js');
const interactions = require('./router/interactions.js');

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});


client.on("messageCreate", async message => {
    if (!message.content.startsWith(prefix)) return;
	commands.get(message); 
 });


client.on('interactionCreate', async interaction => {
	// if (!interaction.isCommand()) return;

	interactions.get(interaction); 
});


// Login to Discord with your client's token
client.login(token);