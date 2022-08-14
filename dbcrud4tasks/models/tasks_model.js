// knex
import {knx} from "../knex.js";

export function getTasks() {
    return knx.select('*').from('items')
}

export function getSingleTask(id) {
    return knx.select('*').from('items').whereIn('id', [id])
}

export function createTask(done, title, due_date, list_id, description) {
    return knx('items').insert({done, title, due_date, list_id, description}, '*')
}

export function updateTask(id, done, title, due_date, list_id, description) {
    return knx('items').whereIn('id', [id])
        .update({done, title, due_date, list_id, description}, '*')
}

export function putTask(id, done, title, due_date, list_id, description) {
    return knx('items').whereIn('id', [id])
        .update({done, title, due_date, list_id, description}, '*')
}

export function deleteTask(id) {
    return knx('items').delete().whereIn('id', [id])
}
