import { Client, Collection, GatewayIntentBits, messageLink } from 'discord.js';
import { AR_AR_AR, SELF_ID, WHAT_THE_SIGMA } from './constants';
const fs = require('node:fs');
const path = require('node:path');
const emoji = require('./global');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', async message => {
	try {

		// todo add toggle for annoying stuff
		if (message.author.id == SELF_ID) {
			return;
		}
		if ( message.author.id == "569287413281849369") {
			await message.react(emoji.view_emoji());
		}

		let msg = message.content;

		if (message.content.toLowerCase().includes('fuck')) {
			await message.reply("man fuck you")
		}

		if (message.content.toLowerCase() == "good bot") {
			await message.reply("kill yourself")
		}

		const programmerRegex = /(==|!=)/gi;
		if (programmerRegex.test(msg)){
			await message.reply("ohh lookie here. mr programmer.") 
		}

		const penisRegex = /(penis)/gi;
		if (penisRegex.test(msg)){
			await message.reply("hehe penis") 
		}

		const erRegex = /\b(\w+)er\b/gi;
		msg.match(erRegex)?.map(
			async (word) => await message.reply(`${word.slice(0,-2)} her? I barely even know her!`)
		)

		const godIsGoodRegex = /\bgod is good\b/gi;
		if (godIsGoodRegex.test(msg)){
			await message.reply("you can say that again")
		}

		const imReg = /\b(im|i\'m)\b\s*(.*)/i;
		const imFind = msg.match(imReg);
		if (imFind != null) {
			await message.reply("Hi "+ imFind[2] + ", I'm manasbot!"); 
		}

		const arRegex = /ar/gi;
		let newStr = msg.replace(arRegex, match => `__***${match}***__`)
		msg = newStr != msg ? `${newStr}\n${AR_AR_AR}` : msg;

		const whatRegex = /(\bwhat\b|\bwat\b)/gi;
		newStr = msg.replace(whatRegex, match => `__***${match}esiggma***__`);
		msg = newStr != msg ? `${newStr}\n${WHAT_THE_SIGMA}` : msg;

		if (message.content == "^") {
			await message.channel.send("^")
		} 

		if (message.content != msg) {
			await message.reply(msg);
		}

	} catch (e) {
		console.log(e)
	}

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

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
});

client.login(process.env.TOKEN);