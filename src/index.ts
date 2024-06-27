import { DiscordLevelingSystem } from './DiscordLevelingSystem';

const instance = new DiscordLevelingSystem();

await instance.run();

for (const signal of ['SIGHUP', 'SIGINT']) {
    process.on(signal, async () => await instance.shutdown());
}
