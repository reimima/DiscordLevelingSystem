import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { config } from './config';
import type { Database } from './tables';

export const database = new Kysely<Database>({
    dialect: new MysqlDialect({
        pool: createPool(config.database),
    }),
});
