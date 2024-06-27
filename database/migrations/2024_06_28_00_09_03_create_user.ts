import type { Kysely } from 'kysely';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function up(db: Kysely<any>) {
    await db.schema
        .createTable('user')
        .ifNotExists()
        .addColumn('user_id', 'integer', col => col.primaryKey().unsigned())
        .addColumn('datas', 'json', col => col.notNull())
        .execute();
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function down(db: Kysely<any>) {
    await db.schema.dropTable('user').execute();
}
