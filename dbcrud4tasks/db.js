import pg from 'pg';
export const pool = new pg.Pool({
    user: 'support',
    host: '127.0.0.1',
    database: 'list',
    password: 'support',
    port: 5432,
});