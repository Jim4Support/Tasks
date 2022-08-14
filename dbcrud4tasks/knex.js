import knex from "knex";
export const knx = new knex({
    client: 'pg',
    connection: {
        user: 'support',
        host: '127.0.0.1',
        database: 'employees',
        password: 'birthday',
        port: 5432,
    }
});