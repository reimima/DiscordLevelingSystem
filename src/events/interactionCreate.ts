import { randomUUID } from 'node:crypto';
import { inspect } from 'node:util';
import { EventDecorator } from '@/decorators';
import { Event } from '@/interfaces';
import {
    type BaseMessageOptions,
    Colors,
    type DiscordAPIError,
    EmbedBuilder,
    type Interaction,
    italic,
} from 'discord.js';

@EventDecorator({ name: 'interactionCreate' })
export default class extends Event {
    public async run(interaction: Interaction) {
        if (!interaction.inCachedGuild()) return;

        try {
            if (interaction.isChatInputCommand()) {
                const command = this.instance.commands.get(interaction.commandName);

                await command?.run(interaction);
            }
        } catch (e) {
            this.logger.error(e);

            const exec =
                /^\/interactions\/\d+\/(?<token>.+)\/callback$/.exec((e as DiscordAPIError).url)
                    ?.groups ?? {};
            const message: BaseMessageOptions = {
                embeds: [
                    new EmbedBuilder()
                        .setColor(Colors.Red)
                        .setTitle('An error occured when sending a message')
                        .setDescription(
                            inspect(e, { depth: 1, maxArrayLength: null })
                                .substring(0, 4096)
                                .replace(exec['token'] ?? randomUUID(), italic('redacted')),
                        )
                        .setTimestamp(),
                ],
            };

            if (interaction.isChatInputCommand()) {
                if (interaction.replied || interaction.deferred) {
                    await interaction.editReply(message).catch(err => this.logger.error(err));
                } else {
                    await interaction.reply(message).catch(err => this.logger.error(err));
                }
            }
        }
    }
}
