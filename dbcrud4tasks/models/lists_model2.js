import {pool} from '../tasks_db.js';

export function getLists() {
    return pool.query('SELECT * FROM lists')
        .then(res => res.rows)
}

export function getSingleList(id) {
    return pool.query('SELECT * FROM lists WHERE id = $1', [id])
        .then(res => res.rows[0])
}

export function createLists(done, title, due_date) {
    return pool.query('INSERT INTO public.lists(done, title, due_date) VALUES ($1, $2, $3) RETURNING id, done, title, due_date', [done, title, due_date])
        .then(res => res.rows[0])
}

export function updateLists(id, done, title, due_date) {
    return pool.query('UPDATE public.lists SET done = $2, title = $3, due_date = $4 WHERE id = $1 RETURNING id, done, title, due_date', [id, done, title, due_date])
        .then(res => res.rows[0])
}

export function putLists(id, done, title, due_date) {
    return pool.query('UPDATE public.lists SET done = $2, title = $3, due_date = $4 WHERE id = $1 RETURNING id, done, title, due_date', [id, done, title, due_date])
        .then(res => res.rows[0])
}

export function deleteLists(id) {
    return pool.query('DELETE FROM public.lists WHERE id = $1 RETURNING id, done, title, due_date', [id])
        .then(res => res.rows[0])
}
