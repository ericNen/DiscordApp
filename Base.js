// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { constants } = require('node:buffer');


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);

client.commands = new Collection();

const FolderPath = path.join(__dirname, "commands");
const CommandsFolder = fs.readdirSync(FolderPath);

for(const Fold of CommandsFolder){
	const cmdPath = path.join(FolderPath, Fold);
	const JsFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith(".js"));
	for(const file of JsFiles){
		const jsFilePath = path.join(cmdPath, file);
		const command = require(jsFilePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${jsFilePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction =>{
	//你可以在這裡用autocomplete找到interaction的所有內容
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if(!command){ console.log("Not a command");return;}
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	//console.log(interaction);
})