const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const emoji = require("../../global");

module.exports = {
    data: new SlashCommandBuilder()
		.setName('change_emoji')
		.setDescription('changes yossef\'s emoji to a different one')
		.addStringOption(option =>
			option.setName('emoji')
				.setDescription('paste emoji to use')),
		async execute(interaction) {
            if (interaction.member?.user.id == "569287413281849369") {
                await interaction.reply("dont try yossef. https://tenor.com/view/jjk-jujutsu-kaisen-jjk-fight-jujutsu-kaisen-fight-yuji-gif-14791240713988465127");
                return;
            }

            emoji.set_emoji(interaction.options.getString('emoji')!);
            console.log("emoji changed to " + emoji.view_emoji());
			await interaction.reply("Success.... I think? \n new emoji: " + emoji.view_emoji());
		}
};