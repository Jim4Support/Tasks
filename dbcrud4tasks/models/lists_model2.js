import {pool} from '../tasks_db.js';

export function getTodayCount() {
    const today = new Date();
    return pool.query('SELECT COUNT(title) FROM items WHERE due_date BETWEEN $1 AND $2', [today, today])
        .then(res => res.rows[0])
}
export function notDoneTasks() {
    return pool.query('SELECT l.name, COUNT(t.done = false OR null) AS undone FROM items AS t RIGHT JOIN list AS l ON l.id = t.list_id GROUP BY l.name')
        .then(res => res.rows)
}
export function getTodayTasks() {
    const today = new Date();
    return pool.query('SELECT name AS lists, title AS task FROM items AS i LEFT JOIN list l on l.id = i.list_id WHERE i.due_date BETWEEN $1 AND $2', [today, today])
        .then(res => res.rows)
}
export function listUndoneTasks(listId, all) {
    return pool.query('SELECT * FROM items WHERE list_id = $1 AND done = false OR list_id = $1 AND done = $2',[listId, all])
        .then(res => res.rows)
}
