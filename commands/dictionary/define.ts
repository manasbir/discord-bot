const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
import Dictionary from "@/dictionary"
const dictionary = new Dictionary(process.env.DICTIONARY_API_KEY!);

export const data = new SlashCommandBuilder()
		.setName('define')
		.setDescription('defines a word')
		.addStringOption(option =>
			option.setName('word')
				.setDescription('word to define'))

export async function execute(interaction) {
			let res = await dictionary.get_info(interaction.options.getString('word')!)
			await interaction.reply(res ? res : "an error occurred");
		}