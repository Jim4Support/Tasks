import {pool} from '../tasks_db.js'; // SQL

export function getTodayCount() {
    const today = new Date();
    return pool.query('SELECT COUNT(title) FROM items WHERE due_date BETWEEN $1 AND $2', [today, today])
        .then(res => res.rows[0])
}
export function notDoneTasks() {
    return pool.query('SELECT l.name AS name, i.list_id AS id, COUNT(i.done = false OR null) AS undone FROM items AS i RIGHT JOIN list AS l ON l.id = i.list_id GROUP BY l.name, i.list_id')
        .then(res => res.rows)
}
export function getTodayTasks() {
    const today = new Date();
    return pool.query('SELECT list.name AS lists, list.id AS list_id, done AS done, items.id AS items_id, due_date AS due_date, title FROM items LEFT JOIN list on list.id = items.list_id WHERE items.due_date BETWEEN $1 AND $2', [today, today])
        .then(res => res.rows)
}
export function listUndoneTasks(listId, all) {
    return pool.query('SELECT * FROM items WHERE list_id = $1 AND done = false OR list_id = $1 AND done = $2',[listId, all])
        .then(res => res.rows)
}
