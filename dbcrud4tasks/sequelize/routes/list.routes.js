import {createList, deleteList, findAll, updateList} from "../controllers/list.controller.js";
import Router from 'express';

export function sequelizeLists(app) {
    const router = Router();

    router.get("/", findAll);
    router.post("/", createList);
    router.delete("/:id", deleteList);
    router.put("/:id", updateList);

    app.use('/api/lists', router);
}