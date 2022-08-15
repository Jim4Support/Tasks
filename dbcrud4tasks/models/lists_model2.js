import {knx} from "../knex.js";

export function getTodayCount() {
    const today = new Date();
    return knx('items').count('title')
        .whereBetween('due_date',[today, today])
}
export function notDoneTasks() {
    return knx.select('list.name', 'list.id')
        .count('items.title as undone')
        .where('items.done', false)
        .orWhere('items.done', null)
        .from('items')
        .rightJoin('list', 'list.id', 'items.list_id')
        .groupBy('list.name', 'list.id')
}
export function getTodayTasks() {
    const today = new Date();
    return knx.select('items.title as title', 'items.id as item_id', 'items.done', 'items.due_date', 'list.name as list', 'list.id as list_id')
        .whereBetween('items.due_date', [today, today])
        .from('items')
        .leftJoin('list','list.id', 'items.list_id')
}
export function listUndoneTasks(listId, all) {
    return knx.select('*')
        .from('items')
        .where('list_id', listId).andWhere('done', false)
        .orWhere('list_id', listId).andWhere('done', all)
}
