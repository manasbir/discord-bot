const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const emoji = require("../../global");

module.exports = {
    data: new SlashCommandBuilder()
		.setName('view_emoji')
		.setDescription('view yossef\'s emoji to a different one'),
		async execute(interaction) {
			await interaction.reply("curr emoji: " + emoji);
		}
};