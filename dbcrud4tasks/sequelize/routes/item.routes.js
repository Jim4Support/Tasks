import {findAll} from "../controllers/item.controller.js";
import Router from 'express';

export function sequelizeItems(app) {
    const router = Router();

    router.get("/", findAll);

    app.use('/api/tasks', router);
}