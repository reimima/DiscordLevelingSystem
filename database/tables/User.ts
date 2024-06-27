import type { JSONColumnType } from 'kysely';

export interface User {
    userId: number;

    datas: JSONColumnType<{
        [guildId: string]: {
            level: number;
        };
    } | null>;
}
