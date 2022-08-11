import {pool} from '../tasks_db.js';

export function getTodayTasks() { //('SELECT COUNT(done),title FROM items WHERE done=false GROUP BY title')
    return pool.query('SELECT COUNT(id) FROM items WHERE due_date BETWEEN CURRENT_DATE AND CURRENT_DATE')
        .then(res => res.rows[0])
}

export function getTasks() {
    return pool.query('SELECT * FROM items')
        .then(res => res.rows)
}

export function getSingleTask(id) {
    return pool.query('SELECT * FROM items WHERE id = $1', [id])
        .then(res => res.rows[0])
}

export function createTask(done, title, due_date) {
    return pool.query('INSERT INTO public.items(done, title, due_date) VALUES ($1, $2, $3) RETURNING id, done, title, due_date', [done, title, due_date])
        .then(res => res.rows[0])
}

export function updateTask(id, done, title, due_date) {
    return pool.query('UPDATE public.items SET done = $2, title = $3, due_date = $4 WHERE id = $1 RETURNING id, done, title, due_date', [id, done, title, due_date])
        .then(res => res.rows[0])
}

export function putTask(id, done, title, due_date) {
    return pool.query('UPDATE public.items SET done = $2, title = $3, due_date = $4 WHERE id = $1 RETURNING id, done, title, due_date', [id, done, title, due_date])
        .then(res => res.rows[0])
}

export function deleteTask(id) {
    return pool.query('DELETE FROM public.items WHERE id = $1 RETURNING id, done, title, due_date', [id])
        .then(res => res.rows[0])
}
