/*import {pool} from "../database.js"; LIST MODELS

const printError = (err) => {
    console.error(err);
    return Promise.reject(err);
};


export function taskCountOnToday() {
    const date = new Date();

    return pool
        .query(`SELECT COUNT(name)
                FROM tasks
                WHERE due_date BETWEEN $1 AND $2`, [date, date])
        .then(res => res.rows[0])
}

export function groupNotCompletedTasksCountByListName() {
    return pool
        .query(`SELECT l.name,
                       COUNT(t.done = false OR null)
                           AS "Not Completed Tasks Count"
                FROM tasks AS t
                         RIGHT JOIN lists AS l ON l.id = t.list_id
                GROUP BY l.name`)
        .then(res => res.rows)
}

export function tasksOnToday() {
    const date = new Date();

    return pool
        .query(`SELECT t.name AS task, l.name AS list
                       FROM tasks AS t
                                LEFT JOIN lists AS l ON l.id = t.list_id
                       WHERE t.due_date BETWEEN $1 AND $2`, [date, date]
        )
        .catch(printError)
        .then(res => res.rows)
}

export function notAllTasksFromList(listId) {
    return pool
        .query(`SELECT * FROM tasks WHERE list_id = $1 AND done = false`,[listId])
        .then(res => res.rows)
}

export function allTasksFromList(listId) {
    return pool
        .query(`SELECT * FROM tasks WHERE list_id = $1`,[listId])
        .then(res => res.rows)
}*/

/*
import {Router} from "express"
import {
    taskCountOnToday,
    groupNotCompletedTasksCountByListName,
    tasksOnToday,
    notAllTasksFromList,
    allTasksFromList
} from "./list.models.js";

export const listRoutes = new Router()

listRoutes.get('/dashboard', dashboardHandler)
listRoutes.get('/collection/today', todayTasksHandler)
listRoutes.get('/lists/:listId/tasks', tasksFromListHandler)

function dashboardHandler(req, res) {
    Promise.all([taskCountOnToday(),
        groupNotCompletedTasksCountByListName()])
        .then(results => res.json({"todayTasksCount": results[0].count, "lists": results[1]}))
}

function todayTasksHandler(req, res) {
    tasksOnToday()
        .then(list => res.json(list))
        .catch(() => res.sendStatus(500))
}

function tasksFromListHandler(req, res) {
    const all = req.query.all || false
    const listId = req.params['listId']
    if (all){
        allTasksFromList(listId)
            .then(tasks => res.json(tasks))
            .catch(() => res.sendStatus(500))
        return
    }
    notAllTasksFromList(listId)
        .then(tasks => res.json(tasks))
        .catch(() => res.sendStatus(500))
}*/

/*
import {pool} from "../database.js"; TASK MODELS

const printError = (err) => {
    console.error(err);
    return Promise.reject(err);
};

export function getTasks() {
    return pool
        .query('SELECT * FROM tasks')
        .catch(printError)
        .then(res => res.rows);
}

export function createTask(name, due_date, done, list_id, description) {
    return pool
        .query(`INSERT INTO public.tasks(name, due_date, done, list_id, description)
                VALUES ($1, $2, $3, $4, $5) RETURNING id, name, due_date, done, list_id, description`,
            [name, due_date, done, list_id, description])
        .catch(printError)
        .then((res) => res.rows[0]);
}

export function getOneTask(id) {
    return pool
        .query('SELECT * FROM tasks WHERE id = $1', [id])
        .catch(printError)
        .then(res => res.rows[0]);
}

export function updateTask(id, name, due_date, done, list_id, description) {
    return pool
        .query(`UPDATE public.tasks
                SET name=$2,
                    due_date=$3,
                    done=$4,
                    list_id=$5,
                    description=$6
                WHERE id = $1 RETURNING id, name, due_date, done, list_id, description`,
            [id, name, due_date, done, list_id, description])
        .catch(printError)
        .then((res) => res.rows[0]);
}


export function deleteTask(id) {
    return pool
        .query('DELETE FROM public.tasks WHERE id = $1 ', [id])
        .catch(printError)
        .then(res => res.rows[0]);
}

export function supersedeTask(id, name, due_date, done, list_id, description) {
    return pool
        .query(`UPDATE public.tasks
                SET name=$2,
                    due_date=$3,
                    done=$4,
                    list_id=$5,
                    description=$6
                WHERE id = $1 RETURNING id, name, due_date, done, list_id, description`,
            [id, name, due_date, done, list_id, description])
        .catch(printError)
        .then((res) => res.rows[0]);
}*/

/*
import express, {Router} from "express";
import {createTask, deleteTask, getOneTask, getTasks, supersedeTask, updateTask} from "./task.models.js";

export const taskRoutes = new Router();
taskRoutes.use(express.json());

taskRoutes.post('/tasks', createTaskHandler);
taskRoutes.get('/tasks', getTasksHandler);
taskRoutes.get('/tasks/:id', getOneTaskHandler);
taskRoutes.patch('/tasks/:id', updateTaskHandler);
taskRoutes.delete('/tasks/:id', deleteTaskHandler);
taskRoutes.put('/tasks/:id', supersedeTaskHandler);

function createTaskHandler(req, res) {
    const {name, due_date, done, list_id, description} = req.body;
    createTask(name, due_date, done, list_id, description)
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500));
}

function getTasksHandler(req, res) {
    getTasks()
        .then(tasks => res.json(tasks))
        .catch(() => res.sendStatus(500));
}

function getOneTaskHandler(req, res) {
    const id = req.params.id
    getOneTask(id)
        .then(task => task ? res.json(task) : res.sendStatus(404))
        .catch(() => res.sendStatus(500))
}

function updateTaskHandler(req, res) {
    const id = req.params.id
    getOneTask(id)
        .then(oldTask => Object.assign(oldTask, req.body))
        .then(({name, due_date, done, list_id, description}) => updateTask(id, name, due_date, done, list_id, description))
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500))
}

function deleteTaskHandler(req, res) {
    const id = req.params.id
    deleteTask(id)
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500))
}

function supersedeTaskHandler(req, res) {
    const id = req.params.id;
    const {name, due_date, done, list_id, description} = req.body;
    supersedeTask(id, name, due_date, done, list_id, description)
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500))
}*/

/*import express from "express"; INDEX
import {taskRoutes} from './tasks/task.routes.js';
import {listRoutes} from "./lists/list.routes.js";

const PORT = 3000;

const app = express();

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}

app.use(express.json());
app.use(logRequest)
app.use(listRoutes)
app.use(taskRoutes)

app.listen(PORT, ()=> console.log('Server started on port: ' + PORT ));*/
