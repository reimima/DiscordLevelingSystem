import type { DiscordLevelingSystemBot } from '@/DiscordLevelingSystemBot';
import type { ClientEvents } from 'discord.js';
import { Structure } from './Structure';

export abstract class Event<K extends keyof ClientEvents = keyof ClientEvents> extends Structure {
    public constructor(
        protected readonly instance: DiscordLevelingSystemBot,
        public readonly data: Readonly<{
            name: K;
            once?: boolean;
        }>,
    ) {
        super(data.name);
    }

    public abstract run(...args: ClientEvents[K]): unknown;
}

export type EventConstructor = new (..._args: ConstructorParameters<typeof Event>) => Event;
