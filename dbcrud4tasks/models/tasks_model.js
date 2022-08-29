// knex
import {knx} from "../knex.js";

export function getTasks() {
    return knx.select('*').from('items')
}

export function getSingleTask(id) {
    return knx.select('*').from('items').whereIn('id', [id])
}

export function createTask(done, name, dueDate, listId, description) {
    return knx('items').insert({done, name, dueDate, listId, description}, '*')
}

export function updateTask(id, done, name, dueDate, listId, description) {
    return knx('items').whereIn('id', [id])
        .update({done, name, dueDate, listId, description}, '*')
}

export function putTask(id, done, name, dueDate, listId, description) {
    return knx('items').whereIn('id', [id])
        .update({done, name, dueDate, listId, description}, '*')
}

export function deleteTask(id) {
    return knx('items').delete().whereIn('id', [id])
}
