import { CommandDecorator } from '@/decorators';
import { Command } from '@/interfaces';
import { type ChatInputCommandInteraction, Colors, EmbedBuilder, inlineCode } from 'discord.js';

@CommandDecorator({
    name: 'ping',
    description: 'Check the latency of the bot',
})
export default class extends Command {
    public async run(interaction: ChatInputCommandInteraction<'cached'>) {
        await interaction.deferReply({ ephemeral: true });

        const time = (await interaction.fetchReply()).createdTimestamp;

        await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setColor(Colors.Default)
                    .addFields(
                        {
                            name: '⏱ WebSocket',
                            value: inlineCode(`${this.instance.ws.ping}ms`),
                        },
                        {
                            name: '🔨 API',
                            value: inlineCode(`${time - interaction.createdTimestamp}ms`),
                        },
                    )
                    .setTimestamp(),
            ],
        });
    }
}
