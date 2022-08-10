import {pool} from '../db.js';

export function getTasks() {
    return pool.query('SELECT * FROM items')
        .then(res => res.rows)
}
export function getSingleTask(id) {
    return pool.query('SELECT * FROM items WHERE id = $1', [id])
        .then(res => res.rows[0])
}
export function createTask(id, done, title, due_date) {
    return pool.query('INSERT INTO public.items(id, done, title, due_date) VALUES ($1, $2, $3, $4)', [id, done, title, due_date])
        .then(res => res.rows[0])
}
export function updateTask(id, done, title, due_date) {
    return pool.query('UPDATE public.items SET done = $2, title = $3, due_date = $4 WHERE id = $1', [id, done, title, due_date])
        .then(res => res.rows[0])
}
export function putTask(id, done, title) {
    return pool.query('UPDATE public.items SET done = $2, title = $3, due_date = $4 WHERE id = $1', [id, done, title])
        .then(res => res.rows[0])
}
export function deleteTask(id) {
    return pool.query('DELETE FROM public.items WHERE id = $1', [id])
        .then(res => res.rows[0])
}