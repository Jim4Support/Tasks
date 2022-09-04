import {knx} from "../knex.js";

export function getTodayCount() {
    const today = new Date();
    return knx('items').count('name')
        .whereBetween('dueDate',[today, today])
}
export function notDoneTasks() {
    return knx.select('list.name', 'list.id')
        .count('items.name as undone')
        .where('items.done', false)
        .orWhere('items.done', null)
        .from('items')
        .rightJoin('list', 'list.id', 'items.listId')
        .groupBy('list.name', 'list.id')
}
export function getTodayTasks() {
    const today = new Date();
    return knx.select('items.name as name', 'items.id as item_id', 'items.done', 'items.dueDate', 'list.name as list', 'list.id as list_id')
        .whereBetween('items.dueDate', [today, today])
        .from('items')
        .leftJoin('list','list.id', 'items.listId')
}
export function listUndoneTasks(listId, all) {
    let query = knx.select('*')
        .from('items')
        .where('listId', listId)
    if (!all){
        query=query.andWhere('done', false)
    }
    return query
}