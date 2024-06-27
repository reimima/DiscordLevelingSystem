import { env } from 'bun';

export const config = Object.freeze({
    database: Object.freeze({
        database: env['MYSQL_DATABASE'],
        host: env['MYSQL_HOST'],
        user: env['MYSQL_USER'],
        password: env['MYSQL_PASSWORD'],
        port: Number(env['MYSQL_PORT']),
    }),
});
