import { EventDecorator } from '@/decorators';
import { Event } from '@/interfaces';
import { env } from 'bun';
import type { Client } from 'discord.js';

@EventDecorator({ name: 'ready', once: true })
export default class extends Event {
    public run(client: Client<true>) {
        const guildSize = client.guilds.cache.size;

        this.logger.info(
            `Logged in as ${client.user.username}.`,
            `Cached ${guildSize} guild${guildSize <= 1 ? '' : 's'}`,
        );

        try {
            this.instance.registerCommands(env['GUILD_ID']);

            this.logger.info('Successfully subscribed commands to Discord Server');
        } catch (e) {
            this.logger.error('There was an error subscribing -', e);
        }
    }
}
