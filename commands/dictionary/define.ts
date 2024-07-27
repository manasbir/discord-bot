const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const Dictionary = require("../../dictionary.ts");

const dictionary = new Dictionary(process.env.DICTIONARY_API_KEY!);

module.exports = {
    data: new SlashCommandBuilder()
		.setName('define')
		.setDescription('defines a word')
		.addStringOption(option =>
			option.setName('word')
				.setDescription('word to define')),
		async execute(interaction) {
			let res = await dictionary.get_info(interaction.options.getString('word')!)
			await interaction.reply(res ? res : "an error occurred");
		}
};