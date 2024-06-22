import { DiscordLevelingSystemBot } from './DiscordLevelingSystemBot';

const instance = new DiscordLevelingSystemBot();

await instance.run();

for (const signal of ['SIGHUP', 'SIGINT']) {
    process.on(signal, async () => await instance.shutdown());
}
