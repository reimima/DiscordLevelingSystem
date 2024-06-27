import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { env } from 'bun';
import { Client } from 'discord.js';
import { configure, getLogger, shutdown } from 'log4js';
import type { Command, Event } from './interfaces';

export class DiscordLevelingSystem extends Client {
    private readonly logger = getLogger('DiscordLevelingSystem');

    public readonly commands: Map<string, Command> = new Map();

    public constructor() {
        super({
            intents: ['Guilds', 'GuildIntegrations'],
            allowedMentions: { repliedUser: false },
        });

        configure({
            appenders: {
                console: {
                    type: 'stdout',
                    layout: { type: 'pattern', pattern: '%[[%d]%] %[[%p]%] %[[%c]%]: %m' },
                },
            },
            categories: {
                default: { appenders: ['console'], level: 'info', enableCallStack: true },
            },
        });
    }

    public async run() {
        this.logger.info('Initializing...');

        try {
            await this.loadEvents();
            await this.loadCommands();
        } catch (e) {
            this.logger.error(e);
        }

        this.logger.info('Initialize done. Logging in...');

        await super.login(env['DISCORD_TOKEN']).catch(e => this.logger.error(e));
    }

    public async shutdown() {
        this.logger.info('Shutting down...');

        this.removeAllListeners();
        await this.destroy();

        shutdown();
        process.exit();
    }

    public registerCommands(guildId?: string) {
        const datas = [...this.commands.values()].map(command => command.data);
        const target = guildId
            ? this.guilds.cache.get(guildId)?.commands
            : this.application?.commands;

        target?.set(datas);
    }

    private async loadEvents() {
        const files = this.scanFiles(join(__dirname, 'events'));
        const events = await this.loadModules<Event>(files);

        for (const event of events) {
            this[event.data.once ? 'once' : 'on'](event.data.name, async (...args) => {
                if (event.run.constructor.name === 'AsyncFunction') {
                    await event.run(...args);
                } else {
                    event.run(...args);
                }
            });
        }
    }

    private async loadCommands() {
        const files = this.scanFiles(join(__dirname, 'commands'));
        const commands = await this.loadModules<Command>(files);

        for (const command of commands) {
            const name = command.data.name;

            if (this.commands.has(command.data.name)) {
                throw new Error(`Failed to register ${name}. ${name} is used`);
            }

            this.commands.set(name, command);
        }
    }

    private scanFiles(directory: string, pattern: RegExp = /.ts/): string[] {
        const files: string[] = [];
        const dirents = readdirSync(directory, { withFileTypes: true });

        for (const dirent of dirents) {
            const { name } = dirent;

            if (dirent.isFile()) {
                files.push(resolve(directory, name));
            } else if (dirent.isDirectory()) {
                this.scanFiles(resolve(directory, name), pattern).map(file => files.push(file));
            } else {
                throw new Error(`${name} is neither file nor directory`);
            }
        }

        return files.filter(file => pattern.exec(file));
    }

    private async loadModules<V>(files: string[]) {
        const modules: V[] = [];

        for (const file of files) {
            const module: { default: new (_instance: DiscordLevelingSystem) => V } =
                await import(file);

            modules.push(new module.default(this));
        }

        return modules;
    }
}
