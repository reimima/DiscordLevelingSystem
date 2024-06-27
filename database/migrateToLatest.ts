import fs from 'node:fs/promises';
import path, { join } from 'node:path';
import { FileMigrationProvider, Kysely, Migrator, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { config } from './config';
import type { Database } from './tables';

async function migrateToLatest() {
    const database = new Kysely<Database>({
        dialect: new MysqlDialect({
            pool: createPool(config.database),
        }),
    });
    const migrator = new Migrator({
        db: database,
        provider: new FileMigrationProvider({
            fs,
            path,
            migrationFolder: join(__dirname, 'migrations'),
        }),
    });
    const { error, results } = await migrator.migrateToLatest();

    for (const result of results ?? []) {
        if (result.status === 'Success') {
            console.info(`Migration "${result.migrationName}" was executed successfully`);
        } else if (result.status === 'Error') {
            console.error(`Failed to execute migration "${result.migrationName}"`);
        }
    }

    if (error) {
        console.error('Failed to migrate', error);
        process.exit(1);
    }

    await database.destroy();
}

await migrateToLatest();
