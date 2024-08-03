import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';
import emoji from '@/global';

export const data = new SlashCommandBuilder()
	.setName('change_emoji')
	.setDescription('changes yossef\'s emoji to a different one')
	.addStringOption(option =>
		option.setName('emoji')
			.setDescription('paste emoji to use'))

export async function execute(interaction: ChatInputCommandInteraction) { {
            if (interaction.member?.user.id == "569287413281849369") {
                await interaction.reply("dont try yossef. https://tenor.com/view/jjk-jujutsu-kaisen-jjk-fight-jujutsu-kaisen-fight-yuji-gif-14791240713988465127");
                return;
            }
			// TODO: Correctly identify interaction type
            emoji.set_emoji((interaction.options as any).getString('emoji')!);
            console.log("emoji changed to " + emoji.view_emoji());
			await interaction.reply("Success.... I think? \nnew emoji: " + emoji.view_emoji());
		}
};