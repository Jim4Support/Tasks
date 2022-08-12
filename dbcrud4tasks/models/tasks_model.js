import {pool} from '../tasks_db.js';

export function getTasks() {
    return pool.query('SELECT * FROM items')
        .then(res => res.rows)
}

export function getSingleTask(id) {
    return pool.query('SELECT * FROM items WHERE id = $1', [id])
        .then(res => res.rows[0])
}

export function createTask(done, title, due_date, list_id, description) {
    return pool.query('INSERT INTO public.items(done, title, due_date, list_id, description) VALUES ($1, $2, $3, $4, $5) RETURNING id, done, title, due_date, list_id, description', [done, title, due_date, list_id, description])
        .then(res => res.rows[0])
}

export function updateTask(id, done, title, due_date, list_id, description) {
    return pool.query('UPDATE public.items SET done = $2, title = $3, due_date = $4, list_id = $5, description = $6 WHERE id = $1 RETURNING id, done, title, due_date, list_id, description', [id, done, title, due_date, list_id, description])
        .then(res => res.rows[0])
}

export function putTask(id, done, title, due_date, list_id, description) {
    return pool.query('UPDATE public.items SET done = $2, title = $3, due_date = $4, list_id = $5, description = $6 WHERE id = $1 RETURNING id, done, title, due_date, list_id, description', [id, done, title, due_date, list_id, description])
        .then(res => res.rows[0])
}

export function deleteTask(id) {
    return pool.query('DELETE FROM public.items WHERE id = $1 RETURNING id, done, title, due_date, list_id, description', [id])
        .then(res => res.rows[0])
}
