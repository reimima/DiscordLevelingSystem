import { EventDecorator } from '@/decorators';
import { Event } from '@/interfaces';
import type { Snowflake } from 'discord.js';

@EventDecorator({ name: 'shardReady', once: true })
export default class extends Event {
    public run(id: number, unavailableGuilds: Set<Snowflake> | undefined) {
        const guildSize = unavailableGuilds?.size ?? 0;

        this.logger.info(
            `Shard ${id} has been ready.`,
            `Cached ${guildSize} unavailable guild${guildSize <= 1 ? '' : 's'}`,
        );
    }
}
