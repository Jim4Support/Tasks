import {pool} from '../db';

export  function createTask(done, title, due_date) {
    return pool.query(`INSERT INTO public.items(done, title, due_date) VALUES ($1, $2, $3) RETURNING ${done}`, [done, title, due_date])
        .then(res => res.rows[0])
}
export  function getTasks() {
    return pool.query('SELECT * FROM public.items')
        .then(res => res.rows)
}