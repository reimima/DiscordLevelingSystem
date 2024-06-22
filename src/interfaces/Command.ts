import type { DiscordLevelingSystemBot } from '@/DiscordLevelingSystemBot';
import type { ApplicationCommandData, Interaction } from 'discord.js';
import { Structure } from './Structure';

export abstract class Command extends Structure {
    public constructor(
        protected readonly instance: DiscordLevelingSystemBot,
        public readonly data: ApplicationCommandData,
    ) {
        super(data.name);
    }

    public abstract run(interaction: Interaction<'cached'>): Promise<unknown>;
}

export type CommandConstructor = new (..._args: ConstructorParameters<typeof Command>) => Command;
